const JwtAccessTokenManager = require("./access-token-manager/jwt/index.js");

module.exports = (beans) => {
  beans.accessTokenManager = new JwtAccessTokenManager();
};
