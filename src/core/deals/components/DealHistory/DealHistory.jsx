import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import { useAction } from '../../../../utils';
import { deals } from '../../constants';
import { dealsActions } from '../../state/actions';


export const DealHistory = ({ id, statusMap, statusMessageMap }) => {
    const statuses = useMemo(() => Object.keys(statusMap), [statusMap]);
    const [status, setStatus] = useState(deals.platformStartStatus);

    const activeStatus = statuses.indexOf(status);

    const setUpdatedDealStatus = useCallback(
        updatedDeal => {
            setStatus(updatedDeal.status);
        },
        [],
    );

    const waitStatus = useAction(
        () => dealsActions.waitForNewDealStatus({
            id,
            currentStatus: status,
            callback: setUpdatedDealStatus,
        }),
        [id, setUpdatedDealStatus, status],
    );

    useEffect(() => {
        if (status !== deals.platformEndStatus)
            waitStatus();
    }, [id, status, waitStatus]);

    return (
        <Stepper className='check-controls' activeStep={activeStatus}>
            {statuses && statuses.map(status => (
                <Step key={status}>
                    <StepLabel>{statusMessageMap[status]}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};
