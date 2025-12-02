export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class BadRequest extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class NotFound extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class Conflict extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}

export class InternalError extends AppError {
  constructor(message = 'Internal Error') {
    super(message, 500);
  }
}
