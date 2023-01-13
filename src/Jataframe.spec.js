const Jataframe = require('./Jataframe');
const rows = [
    {
        DATE: '07/21/2022',

        DESCRIPTION: 'Bought 1 GOOG @ 108.12',
        QUANTITY: '1',
        SYMBOL: 'GOOG',
        PRICE: '2.00',
        COMMISSION: '0.00',
        AMOUNT: '-108.12',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-21T05:00:00.000Z',
        TIMESTAMP: 1658379600000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/21/2022',
        SELL_DATE: 0,
        BUY_PRICE: 2,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/21/2022',

        DESCRIPTION: 'Bought 2 GOOG @ 108.11',
        QUANTITY: '2',
        SYMBOL: 'GOOG',
        PRICE: '4.0',
        COMMISSION: '0.00',
        AMOUNT: '-108.11',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-22T05:00:00.000Z',
        TIMESTAMP: 1658466000000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/22/2022',
        SELL_DATE: 0,
        BUY_PRICE: 4,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/23/2022',

        DESCRIPTION: 'Bought 3 GOOG @ 108.11',
        QUANTITY: '3',
        SYMBOL: 'GOOG',
        PRICE: '6.0',
        COMMISSION: '0.00',
        AMOUNT: '-108.11',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-23T05:00:00.000Z',
        TIMESTAMP: 1658552400000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/23/2022',
        SELL_DATE: 0,
        BUY_PRICE: 6,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/23/2022',

        DESCRIPTION: 'Bought 4 GOOG @ 108.11',
        QUANTITY: '4',
        SYMBOL: 'GOOG',
        PRICE: '8.0',
        COMMISSION: '0.00',
        AMOUNT: '-108.11',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-24T05:00:00.000Z',
        TIMESTAMP: 1658638800000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/24/2022',
        SELL_DATE: 0,
        BUY_PRICE: 8,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/25/2022',

        DESCRIPTION: 'Bought 5 GOOG @ 108.11',
        QUANTITY: '5',
        SYMBOL: 'GOOG',
        PRICE: '10.0',
        COMMISSION: '0.00',
        AMOUNT: '-108.11',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-25T05:00:00.000Z',
        TIMESTAMP: 1658725200000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/25/2022',
        SELL_DATE: 0,
        BUY_PRICE: 10,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/26/2022',

        DESCRIPTION: 'Sold 10 GOOG @ 110.9',
        QUANTITY: '10',
        SYMBOL: 'GOOG',
        PRICE: '15.0',
        COMMISSION: '0.00',
        AMOUNT: '2772.44',
        'REG FEE': '0.06',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'SELL',
        DATE_DATE: '2022-07-26T05:00:00.000Z',
        TIMESTAMP: 1658811600000,
        PNL: 61.00,
        stock_or_option: 'stock',
        BUY_DATE: '07/23/2022',
        SELL_DATE: '07/26/2022',
        BUY_PRICE: 8.8,
        SELL_PRICE: 15,
        FEES: '00.06',
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/27/2022',

        DESCRIPTION: 'Bought 5 GOOG @ 108.11',
        QUANTITY: '5',
        SYMBOL: 'GOOG',
        PRICE: '10.0',
        COMMISSION: '0.00',
        AMOUNT: '-108.11',
        'REG FEE': '',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'BUY',
        DATE_DATE: '2022-07-27T05:00:00.000Z',
        TIMESTAMP: 1658898000000,
        PNL: 0,
        stock_or_option: 'stock',
        BUY_DATE: '07/27/2022',
        SELL_DATE: 0,
        BUY_PRICE: 10,
        SELL_PRICE: 0,
        FEES: 0,
        SHORT_OR_LONG: 'long'
    },
    {
        DATE: '07/28/2022',

        DESCRIPTION: 'Sold 10 AMZN @ 110.9',
        QUANTITY: '10',
        SYMBOL: 'AMZN',
        PRICE: '15.0',
        COMMISSION: '0.00',
        AMOUNT: '2772.44',
        'REG FEE': '0.06',
        'SHORT-TERM RDM FEE': '',
        'FUND REDEMPTION FEE': '',
        'DEFERRED SALES CHARGE': '',
        SIDE: 'SELL',
        DATE_DATE: '2022-07-28T05:00:00.000Z',
        TIMESTAMP: 1658984400000,
        PNL: -22,
        stock_or_option: 'stock',
        BUY_DATE: '07/21/2022',
        SELL_DATE: '07/28/2022',
        BUY_PRICE: 7.2,
        SELL_PRICE: 15,
        FEES: '00.06',
        SHORT_OR_LONG: 'long'
    }

]

const moreRows = [
    {
        date: '07/25/2022',

        description: 'Bought 25 GOOG @ 108.12',
        quantity: '25',
        symbol: 'GOOG',
        price: '108.00',
        commission: '0.00',
        amount: '-108.12',
        'reg fee': '',
        'short-term rdm fee': '',
        'fund redemption fee': '',
        'deferred sales charge': '',
        side: 'BUY',
        date_date: ' 2022-07-25T05:00:00.000Z',
        timestamp: 1658725200000,
        pnl: 0,
        stock_or_option: 'stock',
        buy_date: '07/25/2022',
        sell_date: 0,
        buy_price: 108,
        sell_price: 0,
        fees: 0,
        short_or_long: 'long'
    },
    {
        date: '07/25/2022',

        description: 'Bought 5 GOOG @ 108.11',
        quantity: '5',
        symbol: 'GOOG',
        price: '110.0',
        commission: '0.00',
        amount: '-108.11',
        'reg fee': '',
        'short-term rdm fee': '',
        'fund redemption fee': '',
        'deferred sales charge': '',
        side: 'BUY',
        date_date: ' 2022-07-25T05:00:00.000Z',
        timestamp: 1658725200000,
        pnl: -123.20,
        stock_or_option: 'stock',
        buy_date: '07/25/2022',
        sell_date: 0,
        buy_price: 110,
        sell_price: 0,
        fees: 0,
        short_or_long: 'long'
    },
    {
        date: '07/26/2022',

        description: 'Sold 30 GOOG @ 110.9',
        quantity: '30',
        symbol: 'GOOG',
        price: '112.0',
        commission: '0.00',
        amount: '2772.44',
        'reg fee': '0.06',
        'short-term rdm fee': '',
        'fund redemption fee': '',
        'deferred sales charge': '',
        side: 'SELL',
        date_date: ' 2022-07-26T05:00:00.000Z',
        timestamp: 1658811600000,
        pnl: 110.00000000000014,
        stock_or_option: 'stock',
        buy_date: '07/25/2022',
        sell_date: '07/26/2022',
        buy_price: 108.33333333333333,
        sell_price: 112,
        fees: '00.06',
        short_or_long: 'short'
    }
]
describe('Dataframe Tests', () => {

    it('Should create a dataframe with correct length', async () => {
        console.dir(Jataframe);
        const df = new Jataframe([1, 2, 3]);

        expect(df.length).toBe(3);


        const df2 = new Jataframe([1, 2, 3, 'asdf', 'cvb']);

        expect(df2.length).toBe(5);

    });


    it('Should create a Jataframe with columns', async () => {
        const df = Jataframe.new(rows);
        expect(df.length).toBe(8);
        const totalPnl = df.sum('PNL');
        expect(totalPnl).toBe(39);

        const dates = df['BUY_DATE'];
        expect(dates.length).toBe(8);

    });


    it('Should handle queries', async () => {
        const df = Jataframe.new(rows);


        let dates = df.query('BUY_DATE', Jataframe.gt, '07/23/2022');
        expect(dates.length).toBe(3);


        dates = df.query('BUY_DATE', Jataframe.gte, '07/23/2022');
        expect(dates.length).toBe(5);

        dates = df.query('BUY_DATE', Jataframe.lt, '07/23/2022');
        expect(dates.length).toBe(3);

        dates = df.query('BUY_DATE', Jataframe.lte, '07/23/2022');
        expect(dates.length).toBe(5);


        let pnlGt = df.query('PNL', Jataframe.gt, 0);

        expect(pnlGt.length).toBe(1);


        let pnlLt = df.query('PNL', Jataframe.lt, 0);

        expect(pnlLt.length).toBe(1);

    });

    it('Should splice correctly', async () => {
        const df = Jataframe.new(rows);
        const df2 = df.slice('TIMESTAMP', 1658379700000, 1658811500000);
        expect(df2.length).toBe(4);

    });

    it('Should calculate the mean', async () => {
        const df = Jataframe.new(moreRows);
        const mean = df.mean('pnl');
        expect(mean).toBe(-4.399999999999953);
    });

    it('Should calculate the median', async () => {
            const df = Jataframe.new(moreRows);
            const median = df.median('pnl');
            expect(median).toBe(0);
        }
    );

    it('Should calculate the mode', async () => {
        const df = Jataframe.new(moreRows);
        const mode = df.mode('pnl');
        expect(mode).toBe("110.00000000000014");

    });

    it('Should calculate the min', async () => {
        const df = Jataframe.new(moreRows);
        const min = df.min('pnl');
        expect(min).toBe(-123.20);
    });

    it('Should calculate the max', async () => {
        const df = Jataframe.new(moreRows);
        const max = df.max('pnl');
        expect(max).toBe(110.00000000000014);
    });


    it('Should have group by', async () => {

        const df = Jataframe.new(moreRows);
        const groupBy = df.groupBy('short_or_long', {'pnl_sum': {'pnl': Jataframe.sum}});
        expect(Object.keys(groupBy).length).toBe(2);
        expect(groupBy.long.length).toBe(2);
        expect(groupBy.short.length).toBe(1);

        expect(groupBy.long.sum('pnl')).toBe(-123.2);
        expect(groupBy.short.sum('pnl')).toBe(110.00000000000014);


    });

    it('Should have aggregateBy', async () => {
        const df = Jataframe.new(rows);
        // console.log('df', df);
        const grouped = df.aggregateBy('DATE', {'pnl_sum': {'PNL': Jataframe.sum}});
        console.log('grouped', grouped);
        expect(grouped['pnl_sum'][3]).toBe(61);
        expect(grouped['pnl_sum'][5]).toBe(-22);


    });

    it('Should handle whan a key doesnt exit with DF access', async () => {

        const df = Jataframe.new(rows);
        const empty = df['DOESNT_EXIST'];
        expect(empty.length).toBe(0);
    });

    it('Should have DF access', async () => {
        const df = Jataframe.new(rows);
        const dates = df['DATE'];
        console.log(dates);

        expect(dates.length).toBe(8);
        // expect(sorted['PNL')[7]).toBe(110.00000000000014];


        const empty = df['DOESNT_EXIST'];
        console.log('empty', empty);
        expect(empty.length).toBe(0);
    });


});
