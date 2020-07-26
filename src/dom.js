const cheerio = require("cheerio");

function getBeautyFormDom({ text, url, isContinue, nextRequest}) {
    const $ = cheerio.load(text);
    const isFinish = $('.next').length === 0;
    if (isContinue && !isFinish) {
        const nextUrl = $('.next').attr('href');
        nextRequest(nextUrl);
    }
    const result = [];
    $('.lazy').each((index, ele) => {
        result.push({
            name: $(ele).attr('alt'),
            src: $(ele).attr('data-original'),
            url,
        });
    });
    return [result, isFinish];
}

module.exports = {
    getBeautyFormDom,
};