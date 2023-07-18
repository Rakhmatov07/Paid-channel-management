const {hash, compare} = require('bcrypt');

const hashItem = (payload) => hash(payload, 10);
const compareItem = (payload, encryptedPayload) => compare(payload, encryptedPayload);

module.exports = {
    hashItem,
    compareItem
}