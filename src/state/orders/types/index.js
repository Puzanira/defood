import { TransferOrderDeal, TransferOrder } from './orders/TransferOrder';
import { InitialOrderDeal, InitialOrder } from './orders/InitialOrder';


const orders = {
    TransferOrder,
    InitialOrder,
};

const dealModels = {
    InitialOrderDeal,
    TransferOrderDeal,
};

export {
    orders, dealModels,
};
