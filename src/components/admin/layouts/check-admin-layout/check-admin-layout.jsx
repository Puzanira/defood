import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

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

    const currentOrder = useSelector(({ admin }) => admin.currentOrder);
    const transferParameters = useMemo(
        () => getOrderTransitions(currentOrder),
        [currentOrder],
    );

    const getOrder = useAction(
        () => adminActions.getOrder({ id }),
        [id],
    );

    const onSuccessCallback = useAction(
        order => adminActions.updateOrder({ order }),
        [],
    );

    useEffect(() => {
        getOrder();
        /* eslint react-hooks/exhaustive-deps: 0 */
    }, []);

    return (
        <AdminPageFragment headerData={NODE_CONFIG}>
            {currentOrder && currentOrder.parameters && transferParameters && (
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
        </AdminPageFragment>
    );
};
