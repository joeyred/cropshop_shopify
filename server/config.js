require('dotenv').config();

const {
  SHOPIFY_API_SECRET_KEY,
  SHOPIFY_API_KEY,
  API_VERSION,
  TUNNEL_URL,
} = process.env;

module.exports = {
  shopify: {
    apiKey: SHOPIFY_API_KEY,
    apiSecretKey: SHOPIFY_API_SECRET_KEY,
    apiVersion: API_VERSION,
  },
  tunnelURL: TUNNEL_URL,
};
