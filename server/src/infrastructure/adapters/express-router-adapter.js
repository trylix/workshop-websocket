const responseSerializer = require("../../interfaces/serializers/response-serializer");

const HttpError = require("../../interfaces/utils/errors/http-error");
const httpException = require("../../interfaces/utils/helpers/http-exception");

module.exports = (controller) => {
  return async (req, res) => {
    try {
      const { deps } = req.app;

      const httpRequest = {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body,
        deps,
      };

      const { statusCode, body } = await controller(httpRequest);

      if (body) {
        res.status(statusCode).json(responseSerializer(body));
        return;
      }

      res.sendStatus(statusCode);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
      }

      res
        .status(httpException.InternalServerError)
        .json({ message: err.message });
    }
  };
};
