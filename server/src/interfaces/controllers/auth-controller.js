const getAccessToken = require("../../application/use-cases/auth/get-access-token");

const httpResponse = require("../utils/helpers/http-response");

const HttpError = require("../utils/errors/http-error");
const httpException = require("../utils/helpers/http-exception");

module.exports = {
  async store({
    body: { email, password },
    deps: { accessTokenManager, userRepository },
  }) {
    try {
      const accessToken = await getAccessToken({
        email,
        password,
        accessTokenManager,
        repository: userRepository,
      });

      return httpResponse.created(accessToken);
    } catch (err) {
      if (err instanceof HttpError) {
        throw err;
      }

      throw new HttpError(err.message, httpException.Unauthorized);
    }
  },
};
