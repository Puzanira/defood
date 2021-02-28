import { statusMap as OrderStatusMap, statusMessageMap as OrderStatusMessageMap } from '../statusMap';
import { BakerActionMap, BakerActionMessageMap } from './actionMap';
import {
    statusMap as DeliveryStatusMap,
    statusMessageMap as DeliveryStatusMessageMap,
} from '../deliveryPart/statusMap';
import {
    actionMap as DeliveryActionMap,
    actionMessageMap as DeliveryActionMessageMap,
} from '../deliveryPart/actionMap';
import { InitialOrderDeal } from './model';


const InitialOrder = {
    transitions: {
        Baker: {
            statusMap: OrderStatusMap,
            statusMessageMap: OrderStatusMessageMap,
            actionMap: BakerActionMap,
            actionMessageMap: BakerActionMessageMap,
        },
        Deliverer: {
            statusMap: DeliveryStatusMap,
            statusMessageMap: DeliveryStatusMessageMap,
            actionMap: DeliveryActionMap,
            actionMessageMap: DeliveryActionMessageMap,
        },
    },
};

export { InitialOrderDeal, InitialOrder };
