import React, { useEffect, useMemo, useState, useCallback } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';

import { useAction } from '../../../../utils';
import { deals } from '../../constants';
import { dealsActions } from '../../state/actions';


export const DealHistory = ({ id, statusMap, statusMessageMap }) => {
    const fullStatusMessageMap = { ...statusMessageMap, ...deals.platformStatusMessages };
    const statuses = useMemo(
        () => [...Object.keys(statusMap), deals.platformEndStatus],
        [statusMap],
    );

    const [status, setStatus] = useState(deals.platformStartStatus);

    const activeStatus = statuses.indexOf(status);

    const setUpdatedDealStatus = useCallback(
        updatedDeal => {
            setStatus(updatedDeal.status);
        },
        [],
    );

    const waitStatus = useAction(
        () =>
                dealsActions.waitForNewDealStatus({
                    id,
                    currentStatus: status,
                    callback: setUpdatedDealStatus,
                    repeatCount: 50,
                }),
        [id, setUpdatedDealStatus, status],
    );

    useEffect(() => {
        if (status !== deals.platformEndStatus) {
            try {
                waitStatus();
            } catch (e) {
                console.log(e);
            }
        }
    }, [id, status, waitStatus]);

    return (
        <Stepper className='check-controls' activeStep={activeStatus}>
            {statuses && statuses.map(status => (
                <Step key={status}>
                    <StepLabel>{fullStatusMessageMap[status]}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
};
