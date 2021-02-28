/* eslint max-classes-per-file: 0 */
class DealsError extends Error {
    constructor(id, message) {
        super(message);
        this.id = id;
    }
}

export class StatusNotChangedError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('notChanged'));
    }
}

export class QueueOperationError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('operationError'));
    }
}

export class UnknownError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('unknown'));
    }
}

const errors = {
    notChanged: 'Статус не изменился',
    operationError: 'Операция завершилась с ошибкой',
    unknown: 'Неизвестная ошибка',
};

export const errorFormatter = key => errors[key] || errors.unknown;

