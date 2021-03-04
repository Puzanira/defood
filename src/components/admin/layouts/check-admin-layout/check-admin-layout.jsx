import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import { useAction } from '../../../../utils';
import { adminActions } from '../../../../state/admin/actions';
import { AdminPageFragment } from '../../fragments/admin-page';
import { DealManager } from '../../../../core/deals/components/DealManager';
import { NODE_CONFIG } from '../../../../config';
import { getOrderTransitions } from '../../../../state/orders/types/helpers';
import { AdminOrderParameters } from '../../fragments/admin-order-parameters';
import './check-admin-layout.css';

/**
 * Check admin layout
 */
export const CheckAdminLayout = () => {
    const { id } = useParams();

    const busy = useSelector(({ admin }) => admin.busy);
    const currentOrder = useSelector(({ admin }) => admin.currentOrder);
    const transferParameters = useMemo(
        () => getOrderTransitions(currentOrder),
        [currentOrder],
    );

    const getOrder = useAction(
        () => adminActions.getOrder({ id }),
        [id],
    );

    const updateOrder = useAction(
        order => adminActions.updateOrder({ order }),
        [],
    );

    const onSuccessCallback = order => {
        if (order.localDealId.toString() === id)
            updateOrder(order);
    };

    useEffect(() => {
        getOrder();
        /* eslint react-hooks/exhaustive-deps: 0 */
    }, []);

    return (
        <AdminPageFragment headerData={NODE_CONFIG}>
            <>
                { busy && (
                    <div className='admin-check-layout__progress'>
                        <CircularProgress />
                    </div>
                )}
                {!busy && currentOrder && currentOrder.parameters && transferParameters && (
                    <div>
                        <AdminOrderParameters
                            id={id}
                            leftSideParameters={transferParameters.getParameters(currentOrder)}
                            rightSideParameters={currentOrder.parameters.orderData}
                            total={currentOrder.parameters.total}
                        />
                        <DealManager
                            id={id}
                            currentStatus={currentOrder.status}
                            transferParameters={transferParameters}
                            callback={onSuccessCallback}
                        />
                    </div>
                )}
            </>
        </AdminPageFragment>
    );
};
