
// get theme ID of current theme
// put assets
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const _ = require('lodash');

const {API_VERSION} = process.env;

const assets = [
  {
    key: 'snippets/fsi_button.liquid',
    src: '/static/theme-assets/templates/fsi_button.liquid'
  },
  {
    key: 'assets/test.js',
    src: '/static/theme-assets/scripts/test.js'
  }
];

function putAssetURL(themeID, asset, accessToken) {
  axios({
    method: 'put',
    url: `/admin/api/2019-04/themes/${themeID}/assets.json`,
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json'
    },
    asset
  });
}

function addAssetsToActiveTheme(shop, accessToken) {
  // let themeID;


}

const ThemesID = await fetch(
  `https://${shop}/admin/${API_VERSION}/themes.json`,
  {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json'
    }
  }
).then(response => response.json())
.then(jsonData => _.filter(jsonData.data, {role: 'main'})[0].id)
.then(id => {
  const finalURL = await fetch(
    `https://${shop}/admin/${API_VERSION}/${id}/assets.json`,
    {
      method: 'PUT',

      credentials: 'include',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json'
      }
    }
  )
})
.catch((error) => console.log('error', error))

module.exports = addAssetsToActiveTheme;

// const themeID = () => {
//   let data;
//   axios.get(`https://${shop}/admin/${API_VERSION}/themes.json`)
//     .then(response => {
//       data = response;
//     })
//     .catch(error => {
//       console.log('Error fetching and parsing data', error);
//     });
//   const theme = _.filter(data, {role: 'main'})[0];
//   return theme.id;
// };
//
// axios.put(`/admin/api/2019-04/themes/${themeID()}/assets.json`, {
//   asset: {
//     key: 'snippets/fsi_button.liquid',
//     src: '/static/theme-assets/templates/fsi_button.liquid'
//   }
// });
