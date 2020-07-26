
const request = require('request');
const { getBeautyFormDom } = require('./dom');
const { writeJson } = require('./io');


const res = [];

const requestBeauty = url => {

    // 处理dom文本
    function getBeautyImages(url) {
        return new Promise((resolve, reject) => {
            request.get({ url }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('upload failed:', err);
                }
                resolve({ text: body.toString(), url, isContinue: true, nextRequest: requestBeauty, });
            });
        }).then(getBeautyFormDom);
    }

    return getBeautyImages(url)
        .then(([data, isFinish]) => {
            res.push(...data);
            if (isFinish) {
                writeJson({ res }, './data/hot.json');
            }
        }).catch(e => {
            console.log('e', e)
        });
};

module.exports = {
    requestBeauty,
};