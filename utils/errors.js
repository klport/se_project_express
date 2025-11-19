// const errors {
// 400 — invalid data passed to the methods for creating an item/user or updating an item, or invalid ID passed to the params.
// 404 — there is no user or clothing item with the requested id, or the request was sent to a non-existent address.
// 500 — default error. Accompanied by the message: "An error has occurred on the server."

// utils/errors.js
// module.exports = {
//   BAD_REQUEST: 400,
//   UNAUTHORIZED: 401,
//   NOT_FOUND: 404,
//   CONFLICT_ERROR: 409,
//   INTERNAL_SERVER_ERROR: 500,
// };

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class InsternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InsternalServerError,
};
