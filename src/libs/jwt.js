const {sign, verify} = require('jsonwebtoken');
const {jwt_key} = require('../../config/index');

const getToken = (payload) => sign(payload, jwt_key);
const verifyToken = (payload) => verify(payload, jwt_key);

module.exports = {
    getToken,
    verifyToken
};
