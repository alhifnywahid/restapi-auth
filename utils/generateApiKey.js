// utils/generateApiKey.js
const generateApiKey = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let apiKey = '';
  for (let i = 0; i < 10; i++) {
    apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return apiKey;
};

module.exports = generateApiKey;
