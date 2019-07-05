

const loaderUtils = require('loader-utils');


function loaderFunction(source) {
    // source should be an url from file-loader.
    // We want to load this url and return a promise with the content of the loaded file.
    // This file should be a json file, so we may want to parse this, too.

    const options = loaderUtils.getOptions(this) || {};
    const [, filePath] = /.*"(.*)".*/.exec(source);

    console.log('Using environmentLoader for filePath', filePath);

    const pubPath = `${options.publicPath || ''}${filePath}`;

    console.log('Resolving to urlPath', pubPath);

    // We add Date.now() to our request to avoid caching from the browser.
    return `
module.exports = fetch(${pubPath} + '?id=' + Date.now())
  .then(function(response) {
    return response.json();
  })
    `;
}

module.exports = loaderFunction;
