/* eslint max-classes-per-file: 0 */
class ApiError extends Error {
    constructor(response, message) {
        super(message);
        this.response = response;
    }
}

export class NotAuthorizedError extends ApiError {
    constructor(response) {
        super(response, errorFormatter('notAuthorized'));
    }
}

export class ForbiddenError extends ApiError {
    constructor(response) {
        super(response, errorFormatter('forbidden'));
    }
}

export class NotFoundError extends ApiError {
    constructor(response) {
        super(response, errorFormatter('notFound'));
    }
}

export class UnknownError extends ApiError {
    constructor(response) {
        super(response, errorFormatter('unknown'));
    }
}

const errors = {
    notAuthorized: 'Ошибка авторизации',
    forbidden: 'Операция запрещена',
    notFound: 'Не найдено',
    unknown: 'Неизвестная ошибка',
    tooLarge: 'Превышен размер запроса',
};

export const errorFormatter = key => errors[key] || errors.unknown;

