const crypto = require('crypto-js');

const bytes = crypto.AES.decrypt(process.env.CREDENTIALS_ENCRYPT, process.env.KEY_DECRYPT);
const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));

module.exports = decryptedData;
