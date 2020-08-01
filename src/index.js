const { requestBeauty, requestBeautyV2 } = require('./api');

const test = (url) => {
    requestBeautyV2(url)
};

const homeUrl = 'https://www.mzitu.com/hot/';

test(homeUrl);

