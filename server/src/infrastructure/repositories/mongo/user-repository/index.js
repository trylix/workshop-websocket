"use strict";

const model = require("../../../orm/mongoose/schemas/user");
const httpException = require("../../../../interfaces/utils/helpers/http-exception");

const User = require("../../../../domain/entities/user");
const UserRepository = require("../../../../domain/repositories/user-repository");
const HttpError = require("../../../../interfaces/utils/errors/http-error");

module.exports = class extends (
  UserRepository
) {
  constructor() {
    super();
  }

  async persist(dto) {
    const document = await model.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });

    return new User(document);
  }

  async merge(id, dto) {
    return model.updateOne(
      { _id: id },
      {
        username: dto.username,
        email: dto.email,
        password: dto.password,
      },
      {
        omitUndefined: true,
      }
    );
  }

  async deleteById(id) {
    return model.deleteOne({
      _id: id,
    });
  }

  async fetchById(id) {
    const document = await model.findById(id).lean();
    if (!document) {
      throw new HttpError(
        `No users with id ${id} were found`,
        httpException.BadRequest
      );
    }
    return new User({ id: document._id, ...document });
  }

  async fetchByEmail(email) {
    const document = await model.findOne({ email }).lean();
    if (!document) {
      throw new HttpError(
        `No users with email ${id} were found`,
        httpException.BadRequest
      );
    }
    return new User({ id: document._id, ...document });
  }

  async fetchAll() {
    const documents = await model.find().lean();
    return documents.map((document) => {
      return new User({ id: document._id, ...document });
    });
  }
};
