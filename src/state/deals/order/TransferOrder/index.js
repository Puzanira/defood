import { statusMap as OrderStatusMap } from '../statusMap';
import { BakerActionMap, InitiatorActionMap } from './actionMap';
import { statusMap as DeliveryStatusMap } from '../delivery/statusMap';
import { actionMap as DeliveryActionMap } from '../delivery/actionMap';
import { TransferOrderDeal } from './model';


const TransferOrder = {
    parties: {
        Initiator: {
            statusMap: OrderStatusMap,
            actionMap: InitiatorActionMap,
        },
        Baker: {
            statusMap: OrderStatusMap,
            actionMap: BakerActionMap,
        },
        Deliverer: {
            statusMap: DeliveryStatusMap,
            actionMap: DeliveryActionMap,
        },
    },
};

export { TransferOrder, TransferOrderDeal };
