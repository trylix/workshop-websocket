"use strict";

const jwt = require("jsonwebtoken");
const environment = require("../../../config/environment");

const AccessTokenManager = require("../../../../application/security/access-token-manager");

const JWT_SECRET_KEY = environment.security.secretKey;

module.exports = class extends (
  AccessTokenManager
) {
  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY);
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }
};
