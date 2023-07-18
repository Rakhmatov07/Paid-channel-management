require('dotenv/config');
const {env} = process;

const config = {
    port: +env.PORT,
    jwt_key: env.jwt_key,
    postgres: env.postgres
}

module.exports = config;