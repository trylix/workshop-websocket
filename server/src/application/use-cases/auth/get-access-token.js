"use strict";

module.exports = async ({
  email,
  password,
  accessTokenManager,
  repository,
}) => {
  const user = await repository.fetchByEmail(email);

  if (!user || user.password !== password) {
    throw new Error("Bad credentials");
  }

  const accessToken = accessTokenManager.generate({ id: user.id });

  return {
    accessToken,
  };
};
