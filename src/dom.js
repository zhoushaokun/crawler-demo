const cheerio = require("cheerio");

function getBeautyFormDomV2(text, url) {
    const $ = cheerio.load(text);
    const isFinish = $('.next').length === 0;
    let nextUrl = '';
    const result = [];

    if (!isFinish) {
        nextUrl = $('.next').attr('href');
    }
    $('.lazy').each((index, ele) => {
        result.push({
            name: $(ele).attr('alt'),
            src: $(ele).attr('data-original'),
            url,
        });
    });
    return [result, nextUrl];
}

module.exports = {
    getBeautyFormDomV2,
};