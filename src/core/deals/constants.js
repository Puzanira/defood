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
