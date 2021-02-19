import { config } from '../../../config';
import {
    updateDealStatus,
    waitForDealStatus,
} from '../core/sagas';


const initiator = process.env.REACT_APP_NODE;

export function* waitForBakingStatus({ deal }) {
    const { orderId } = deal;
    try {
        yield waitForDealStatus({
            dealId: orderId,
            node: config.nodes.PIZZA1,
            statuses: ['transferredToDelivery'],
        });
        console.log('Successful delivery receiving');
    } catch (e) {
        console.log('Baker Node not answering');
    }
    const updatedDeal = yield updateDealStatus({ dealId: deal.dealId, nextStatus: 'delivering' });
    return updatedDeal;
}
