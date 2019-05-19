// const fs = require('fs');
const path = require('path');

const dir = require('node-dir');

const _ = require('lodash');
// const config = require('../config');

function getAssetFiles() {
  return dir.files('./public/asset-injections', { sync: true });
}

function generateAssetsArray() {
  const files = getAssetFiles();
  const assetCategories = [
    'layout',
    'templates',
    'sections',
    'snippets',
    'assets',
    'config',
    'locals',
  ];
  // const output = [];
  const assets = files.map((file) => {
    const serverPath = _.replace(file, 'public/', '');
    const themeKey = _.replace(file, 'public/asset-injections/', '');
    const assetCategory = _.replace(path.parse(file).dir, 'public/asset-injections/', '');

    // console.log(serverPath);
    // console.log(themeKey);
    // console.log(assetCategory);
    // output.push(asset(themeKey, serverPath));
    // return asset(themeKey, serverPath);
    if (_.indexOf(assetCategories, assetCategory) === -1) {
      return false;
    } else {
      return {
        key: themeKey,
        src: serverPath,
      };
    }
  });
  return _.compact(assets);
}

// console.log('assets:\n', generateAssetsArray(getAssetFiles()));

module.exports = generateAssetsArray;
