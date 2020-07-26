const { requestBeauty } = require('./api');

const test = (url) => {
    requestBeauty(url)
};

const homeUrl = 'https://www.mzitu.com/hot/';

test(homeUrl);

