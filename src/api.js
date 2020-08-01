
const request = require('request');
const { getBeautyFromDomV2 } = require('./dom');
const { writeJson } = require('./io');

const getBeautyDomStrV2 = async url => { 
    return new Promise((resolve, reject) => {
        request.get({ url }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                reject(err);
                return console.error('upload failed:', err);
            }
            resolve(body.toString());
        });
    })
};

const requestBeautyV2 = async url => { 
    try {
        let nextUrl = url, result = [];

        let isContinue = true;
        const final = [];
        console.log('nextUrl :>> ', nextUrl);
        while (isContinue) { 
            const response = await getBeautyDomStrV2(nextUrl);
            [result, nextUrl] = getBeautyFromDomV2(response, nextUrl);
            final.push(...result);
            isContinue = !!nextUrl;
        }
        const msg = await writeJson({ res: final }, './data/hot.json');
        console.log('msg :>> ', msg);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    requestBeautyV2,
};