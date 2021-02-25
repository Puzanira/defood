import { statusMap as OrderStatusMap } from '../statusMap';
import { BakerActionMap } from './actionMap';
import { statusMap as DeliveryStatusMap } from '../delivery/statusMap';
import { actionMap as DeliveryActionMap } from '../delivery/actionMap';
import { InitialOrderDeal } from './model';


const InitialOrder = {
    parties: {
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

export { InitialOrderDeal, InitialOrder };
