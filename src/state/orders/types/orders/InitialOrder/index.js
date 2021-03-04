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
import { getDeliveryOrderParameters } from '../deliveryPart/parameters';
import { getInitialOrderParameters } from './parameters';


const InitialOrder = {
    transitions: {
        Baker: {
            statusMap: OrderStatusMap,
            statusMessageMap: OrderStatusMessageMap,
            actionMap: BakerActionMap,
            actionMessageMap: BakerActionMessageMap,
            getParameters: getInitialOrderParameters,
        },
        Deliverer: {
            statusMap: DeliveryStatusMap,
            statusMessageMap: DeliveryStatusMessageMap,
            actionMap: DeliveryActionMap,
            actionMessageMap: DeliveryActionMessageMap,
            getParameters: getDeliveryOrderParameters,
        },
    },
};

export { InitialOrderDeal, InitialOrder };
