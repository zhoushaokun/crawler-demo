const fs = require('fs');

const writeJson = (data, loc) => {
    const str = JSON.stringify({
        ...data,
    }, null, "\t");
    return new Promise((resolve, reject) => {
        fs.writeFile(loc, str, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};

module.exports = {
    writeJson,
};