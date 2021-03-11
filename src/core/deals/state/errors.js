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

export class StatusChangedInBackgroundError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('changedInBackground'));
    }
}

export class QueueOperationError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('operationError'));
    }
}

export class QueueOperationNotFoundError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('operationNotFoundError'));
    }
}

export class QueueOperationNotEmptyError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('queueNotEmptyError'));
    }
}

export class ConnectionRefusedError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('connectionRefused'));
    }
}

export class UnknownError extends DealsError {
    constructor(id) {
        super(id, errorFormatter('unknown'));
    }
}

const errors = {
    connectionRefused: 'Отказано в соединении',
    operationNotFoundError: 'Операция не найдена',
    queueNotEmptyError: 'Очередь операций не пустая',
    notChanged: 'Статус не изменился',
    changedInBackground: 'Статус успел измениться',
    operationError: 'Операция завершилась с ошибкой',
    unknown: 'Неизвестная ошибка',
};

export const errorFormatter = key => errors[key] || errors.unknown;

