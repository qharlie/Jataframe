# Jataframe

Javascript Dataframe library, familiar to Pandas users, made for idiots.

### Installation

```npm i --save jataframe```

## What is it ?

A Dataframe library similar to Pandas with a few annoying differences. I needed something simple enough for an idiot to use (me).

### Intro

```javascript
const Jataframe = require('jataframe');
const data = [{price: 2.12, name: 'apple'}, {price: 3.12, name: 'banana'}, {price: 154.12, name: 'eggs'}];

const df = new Jataframe(data);

df.columns   // ['price', 'name']
df['price']  // [2.12, 3.12, 154.12]
df['name']   // ['apple', 'banana', 'eggs']
df.length    // 3
df.head()    // [{price: 2.12, name: 'apple'}, {price: 3.12, name: 'banana'}]
df.print()
```
### Access
Here is the annoying difference.  In Jataframe columns are just raw arrays of data, so every function call needs to be on the dataframe itself, aggregation functions sum/max/mean for example are called as df.sum('column') as opposed to pandas df['column'].sum()
```javascript
const df = new Jataframe(data);
// Aggregation functions are on the Jataframe object, pass the column name to the agg function 
assert(df.mean('price') == 42);
assert(df.sum('price') == 178);
assert(df.max('price') == 154);
assert(df.min('price') == 2);
assert(df.std('price') == 74);

// To filter data, use the filter method, itll return a Jataframe
const filtered = df.filter((row) => row.price > 3);
assert(filtered.length == 2);
assert(filtered['price'] == [154.12, 42.12]);

// It can slice by indices 
const df = new Jataframe(data);
const sliced = df.slice(1, 3);
assert(sliced.length == 2);
assert(sliced['price'] == [3.12, 154.12]);

// You can slice by timestamp with ts_slice 
const tsliced_df = df.ts_slice('TS_COLUMN', new Date('2018-01-01'), new Date('2018-01-03'));

// Sorting 
const sorted = df.sort('price');
assert(sorted['price'] == [2.12, 3.12, 154.12]);

// You can specfiy an order 
const sorted = df.sort('price', 'desc'); // 'descending'
assert(sorted['price'] == [154.12, 3.12, 2.12]);

// Const get the contents of a row as a Jataframe 
const row = df.row(42);
// Const get the contents of as JSON 
const same_row = df.iloc(42);


```
### Manipulation 

```javascript
const df = new Jataframe(data);
// You can add a column
df['new_column'] = [1, 2, 3];
assert(df['new_column'] == [1, 2, 3]);
// fillna will fill undefined with a value
df.fillna('sketchy_col',0);
```
If more than one row is returned from a Jataframe.function(), it will return it as a Jataframe, making chaining easy.

### GroupBy

```javascript

const data = [
    {group: 'A', name: 'Babraham Lincoln'},
    {group: 'A', name: 'Franklin Brosevelt'},
    {group: 'B', name: 'Beninjamin Franklins'},
];

const df = new Jataframe(data);
const groups = df.groupBy('group');
```

groups is now an object whose keys are the groups, and values are Jataframes of the rows in that group.

```javascript
// A and B are dataframes 
assert(groups.A.length == 2)
assert(groups.B.length == 1)
assert(groups.A.unique('name') == ['Babe Lincoln', 'Franklin Brosevelt']);
assert(groups.B.unique('name') == ['Beninjamin Franklins']);

```

### AggregateBy

aggregateBy will reduce the row count to the grouped values row count, and aggregate the columns you supply

```javascript

const data = [
    {group: 'A', name: 'Babe Lincoln', price: 2.12},
    {group: 'A', name: 'Franklin Brosevelt', price: 3.12},
    {group: 'B', name: 'Beninjamin Franklins', price: 154.12},
];

const df = new Jataframe(data);
const groups = df.aggregateBy('group', {
    'price_ttl': {'price': Jataframe.sum},
    'price_avg': {'price': Jataframe.mean},
});

// Now it contains just two rows, one for group A, and one for group B
expect(groups.length).toBe(2);
expect(groups['price_ttl']).toEqual([5.24, 154.12]);
expect(groups['price_avg']).toEqual([2.62, 154.12]);

```

```


