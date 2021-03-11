export const defaultDelay = 30000;
export const defaultRepeat = 10;

export const queue = {
    progressQueueStatuses: [
        'InProgress',
        'InQueue',
    ],
    finalQueueStatuses: [
        'Error',
        'Success',
    ],
    successQueueStatus: 'Success',
    errorQueueStatus: 'Error',
    errorMessages: {
        connectionRefusedError: 'Connection refused',
        itemNotFoundError: 'Item not found',
    },
};

export const deals = {
    platformStartStatus: 'NEW',
    platformEndStatus: 'Closed',
    platformCloseStatuses: ['Closed', 'Cancelled '],
    platformStatuses: ['NEW', 'Closed', 'Cancelled'],
    platformStatusMessages: {
        NEW: 'Создан',
        Closed: 'Закрыт',
        Cancelled: 'Отменен',
    },
};
