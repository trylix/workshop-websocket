const storeUser = require("../../application/use-cases/users/store-user");
const findUsers = require("../../application/use-cases/users/find-users");
const getUser = require("../../application/use-cases/users/get-user");
const deleteUser = require("../../application/use-cases/users/delete-user");
const updateUser = require("../../application/use-cases/users/update-user");

const httpResponse = require("../utils/helpers/http-response");

module.exports = {
  async get({ params, deps }) {
    const user = await getUser({
      id: params.userId,
      repository: deps.userRepository,
    });
    return httpResponse.ok(user);
  },

  async find({ deps }) {
    const users = await findUsers({
      repository: deps.userRepository,
    });
    return httpResponse.ok(users);
  },

  async store({ body: dto, deps }) {
    const user = await storeUser({
      repository: deps.userRepository,
      dto,
    });
    return httpResponse.created(user);
  },

  async update({ params, body: dto, deps }) {
    await updateUser({
      id: params.userId,
      repository: deps.userRepository,
      dto,
    });
    return httpResponse.noContent();
  },

  async delete({ params, deps }) {
    await deleteUser({
      id: params.userId,
      repository: deps.userRepository,
    });
    return httpResponse.noContent();
  },
};
