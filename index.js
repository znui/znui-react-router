require('./dist/index.style.css')
if(process && process.env && process.env.NODE_ENV) {
    if(process.env.NODE_ENV == 'development') {
        module.exports = require('./build/index.js');
    }else{
        module.exports = require('./dist/index.js');
    }
}else {
    module.exports = require('./dist/index.js');
}