const request = require('request');
const cheerio = require("cheerio");
const fs = require('fs');

const res = []; 

const homeUrl = 'https://www.mzitu.com/hot/';

function successCallback({ text, url }) {
    const $ = cheerio.load(text);
    const isFinish = $('.next').length === 0;
    if (!isFinish) {
        const nextUrl = $('.next').attr('href');
        init(nextUrl);
    }
    console.log('currentUrl', url)
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

function getBeautyImages(url) {
    return new Promise((resolve, reject) => {
        request.get({ url }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            resolve({ text: body.toString(), url });
        });
    });
}

const init = (url, callback) => {
    getBeautyImages(url)
    .then(successCallback)
    .then(([data, isFinish]) => {
        res.push(...data);
        console.log('isFinish', isFinish);
        if (isFinish) {
            const str = JSON.stringify({ 
                res,
                homeUrl,
            }, null, "\t");
            return new Promise((resolve, reject) => {
                fs.writeFile('data/data.json', str, function (err) {
                    if (err) {
                        reject(err);
                    }
                });
            });
        }
    }).catch(e => {
        console.log('e', e)
    });
};

init(homeUrl);

