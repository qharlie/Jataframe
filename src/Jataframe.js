const operators = {
// eslint-disable-next-line eqeqeq
  '==': (a, b) => a == b,
  // eslint-disable-next-line eqeqeq
  '!=': (a, b) => a != b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  in: (a, b) => b.includes(a)

};
const handlers = {
  get: (target, prop, receiver) => {
    if (prop in target && prop[0] !== '_') {
      if (typeof target[prop] === 'function') {
        return target[prop].bind(target);
      } else {
        return target[prop];
      }
    } else {
      return target._column(prop);
    }
  },
  set: (target, prop, value) => {
    if (target.data.length !== value.length) { throw new Error('New column length is not equal to the number of rows'); }
    for (let i = 0; i < target.data.length; i++) {
      target.data[i][prop] = value[i];
    }
  }

};

function getMax (arr) {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }
  return max;
}

function getMin (arr) {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
}

class Jataframe {
  constructor (rows) {
    if (!Array.isArray(rows)) {
      throw new Error('Jataframe must be initialized with an array of objects');
    }
    this.data = rows;
    return new Proxy(this, handlers);
  }

  get columns () {
    return Object.keys(this.data[0]);
  }

  get length () {
    return this.data.length;
  }

  toString () {
    // return JSON.stringify(this.data);
    return console.table(this.data);
  }

  sum (column) {
    return this.data.reduce((acc, row) => acc + row[column], 0);
  }

  fillNa (column, value) {
    this.data.forEach(row => {
      if (typeof row[column] === 'undefined') {
        row[column] = value;
      }
    });
    return this;
  }

  mean (column) {
    return this.sum(column) / this.length;
  }

  head (n) {
    return this.data.slice(0, n);
  }

  tail (n) {
    return this.data.slice(-n);
  }

  median (column) {
    const sorted = this._column(column).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }

  /**
     * Returns a new Jataframe with the std deviation of each column
     * @param column
     * @return {number}
     */
  std (column) {
    const mean = this.mean(column);
    return Math.sqrt(this.data.reduce((acc, row) => acc + Math.pow(row[column] - mean, 2), 0) / this.length);
  }

  describe (column) {
    return {
      mean: this.mean(column),
      std: this.std(column),
      median: this.median(column),
      mode: this.mode(column),
      min: this.min(column),
      max: this.max(column),
      count: this.length
    };
  }

  mode (column) {
    const counts = {};
    this._column(column).forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  }

  min (key) {
    return getMin(this._column(key));
  }

  max (key) {
    return getMax(this._column(key));
  }

  groupBy (key) {
    const groups = {};
    this.data.forEach(row => {
      const group = row[key];
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(row);
    });
    for (const group in groups) {
      groups[group] = new Jataframe(groups[group]);
    }
    return groups;
  }

  /**
     * Difference between aggregateBy and aggregateRowsBy is that aggregateRowsBy
     * returns the full row of the dataframe, not just the column
     * @deprecated
     * @param key
     * @param aggs
     * @return {Jataframe}
     */
  aggregateRowsBy (key, aggs) {
    return this.aggregateBy(key, aggs, true);
  }

  aggregateBy (key, aggs, includeFullRows = false) {
    const groups = this.groupBy(key, aggs);
    const result = [];
    for (const group in groups) {
      const template = { group };

      for (const aggName in aggs) {
        const aggKV = aggs[aggName];
        // console.log('aggKV', aggKV);
        // console.log('aggName', aggName);
        // console.log('group', group);
        const key = Object.keys(aggKV)[0];
        const aggFunc = aggKV[key];
        // console.log('key', key);
        // console.log('aggFunc', aggFunc);

        template.row_count = groups[group][key].length;
        if (includeFullRows) {
          template[aggName] = aggFunc(groups[group]);
        } else {
          template[aggName] = aggFunc(groups[group][key]);
        }
      }
      result.push(template);
    }
    return new Jataframe(result);
  }

  _column (key) {
    const ret = this.data.map(row => row[key]);
    if (ret.every(x => typeof x === 'undefined')) {
      return [];
    }
    return ret;
  }

  count (column) {
    return this._column(column).filter(x => typeof x === 'undefined').length;
  }

  query (key, operator, value) {
    return new Jataframe(this.data.filter(row => operators[operator](row[key], value)));
  }

  filter (fn) {
    return new Jataframe(this.data.filter(fn));
  }

  reduce (fn, acc) {
    return this.data.reduce(fn, acc);
  }

  unique (column) {
    return [...new Set(this._column(column))];
  }

  print () {
    console.table(this.data);
  }

  /**
     * Timestamp slice, assuming the first column has timestamp data
     * @param columnOrIndex
     * @param _start
     * @param _end
     * @return {*}
     */
  ts_slice (columnOrIndex, _start, _end) {
    const start = _start; const end = _end;

    return new Jataframe(this.data.filter(row => row[columnOrIndex] >= start && row[columnOrIndex] <= end));
  }

  slice (_start, _end) {
    return new Jataframe(this.data.slice(_start, _end));
  }

  sort (_keys, _order = 'ascending', _coerceFunc = null) {
    const order = _order === 'ascending' ? 'asc' : 'desc';
    const coerceFunc = _coerceFunc || ((x) => x);
    // let keys = _.isArray(_keys) ? _keys : [_keys];
    // return new Jataframe(_.orderBy(this.data, keys, [order]));

    return new Jataframe(this.data.sort((a, b) => {
      if (coerceFunc(a[_keys]) < coerceFunc(b[_keys])) {
        return order === 'asc' ? -1 : 1;
      }
      if (coerceFunc(a[_keys]) > coerceFunc(b[_keys])) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    }));
  }

  toJSON () {
    return this.data;
  }
}

Object.defineProperty(Jataframe, 'gt', {
  value: '>',
  writable: false,
  enumerable: false,
  configurable: false
});
Object.defineProperty(Jataframe, 'lt', {
  value: '<',
  writable: false,
  enumerable: false,
  configurable: false
});
Object.defineProperty(Jataframe, 'gte', {
  value: '>=',
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'lte', {
  value: '<=',
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'eq', {
  value: '==',
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'neq', {
  value: '!=',
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'in', {
  value: 'in',
  writable: false,
  enumerable: false,
  configurable: false
});
Object.defineProperty(Jataframe, 'sum', {
  value: function (arr) {
    return arr.reduce((a, b) => (a || 0) + (b || 0), 0);
  },
  writable: false,
  enumerable: false,
  configurable: false
});
Object.defineProperty(Jataframe, 'cumulative_sum', {
  value: function (arr) {
    let prev = 0;
    const newData = [];
    for (let i = 0; i < arr.length; i++) {
      const current = prev + arr[i];
      newData.push(current);
      prev = current;
    }
    return newData;
  },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'mean', {
  value: function (arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'median', {
  value: function (arr) {
    const mid = Math.floor(arr.length / 2);
    const nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }
});

Object.defineProperty(Jataframe, 'min', {
  value: function (arr) {
    return getMin(arr);
  },
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Jataframe, 'max', {
  value: function (arr) {
    return getMax(arr);
  },
  writable: false,
  enumerable: false,
  configurable: false
});

if (typeof module !== 'undefined') module.exports = Jataframe;
