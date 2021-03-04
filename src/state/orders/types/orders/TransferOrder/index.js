import {
    statusMap as OrderStatusMap,
    statusMessageMap as OrderStatusMessageMap,
} from '../statusMap';
import {
    BakerActionMap,
    BakerActionMessageMap,
    InitiatorActionMap,
    InitiatorActionMessageMap,
} from './actionMap';
import {
    getTransferBakerOrderParameters,
    getTransferInitiatorOrderParameters,
} from './parameters';
import {
    statusMap as DeliveryStatusMap,
    statusMessageMap as DeliveryStatusMessageMap,
} from '../deliveryPart/statusMap';
import {
    actionMap as DeliveryActionMap,
    actionMessageMap as DeliveryActionMessageMap,
} from '../deliveryPart/actionMap';
import { getDeliveryOrderParameters } from '../deliveryPart/parameters';
import { TransferOrderDeal } from './model';


const TransferOrder = {
    transitions: {
        Initiator: {
            statusMap: OrderStatusMap,
            statusMessageMap: OrderStatusMessageMap,
            actionMap: InitiatorActionMap,
            actionMessageMap: InitiatorActionMessageMap,
            getParameters: getTransferInitiatorOrderParameters,
        },
        Baker: {
            statusMap: OrderStatusMap,
            statusMessageMap: OrderStatusMessageMap,
            actionMap: BakerActionMap,
            actionMessageMap: BakerActionMessageMap,
            getParameters: getTransferBakerOrderParameters,
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

export { TransferOrder, TransferOrderDeal };
