require('dotenv').config();
const axios = require('axios');
const _ = require('lodash');
const config = require('../config');

const generateAssetsArray = require('../utils/generate-assets-array');
// const {
//   API_VERSION,
//   config.tunnelURL,
// } = process.env;

// TODO move this to a config file of some sort
// const assets = [
//   {
//     key: 'snippets/fsi_button.liquid',
//     src: 'templates/fsi_button.liquid',
//   },
//   {
//     key: 'assets/test.js',
//     src: 'scripts/test.js',
//   },
// ];

const assets = generateAssetsArray();

function pCons(message) {
  console.log('\x1b[35m%s\x1b[0m', message);
}

async function install(ctx, next) {
  // ctx.status = 200;
  const { shop, accessToken } = ctx.session;
  const path = `https://${shop}/admin/api/${config.shopify.apiVersion}`;
  console.log(ctx.request);
  console.log(shop);
  console.log(accessToken);

  // =============== //
  // Inject Assets
  // =============== //
  const axiosInst = axios.create({
    baseURL: `https://${shop}/admin/api/${config.shopify.apiVersion}`,
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });

  const themeID = await axiosInst.get(
    `${path}/themes.json`,
  ).then((response) => {
    console.log(_.filter(response.data.themes, { role: 'main' })[0].id);
    return _.filter(response.data.themes, { role: 'main' })[0].id;
  }).catch(() => console.log('error on install'));

  for (let i = 0; i < assets.length; i++) {
    pCons(`${path}/themes/${themeID}/assets.json`);
    pCons(`${config.tunnelURL}/${assets[i].src}`);
    await axiosInst.put(
      `/themes/${themeID}/assets.json`,
      {
        asset: {
          key: assets[i].key,
          src: `${config.tunnelURL}/${assets[i].src}`,
        },
      },
    ).then((response) => console.log(response))
      .catch(() => console.log('error on asset injection'));
  }

  // =============== //
  // Add Metafields
  // =============== //

  if (ctx.redirect) {
    return ctx.redirect('/');
  } else {
    await next();
  }
  return ctx.redirect('/');
}

module.exports = install;
