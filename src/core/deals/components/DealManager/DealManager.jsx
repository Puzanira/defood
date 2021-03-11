import React, { useEffect, useMemo } from 'react';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import StepContent from '@material-ui/core/StepContent';
import { useSelector } from 'react-redux';

import { deals } from '../../constants';
import { useAction } from '../../../../utils';
import { dealsActions } from '../../state/actions';
import { DealAction } from '../DealAction';
import './DealManager.css';


export const DealManager = ({
    id,
    currentStatus,
    transferParameters,
    callback,
}) => {
    const {
        statusMap,
        statusMessageMap,
        actionMap,
        actionMessageMap,
    } = transferParameters;

    const [fullStatusMessageMap, fullStatusMap] = useMemo(
        () => [
                { ...statusMessageMap, ...deals.platformStatusMessages },
                { ...statusMap, [deals.platformEndStatus]: null },
            ], [statusMap, statusMessageMap],
        );

    const status = currentStatus || deals.platformStartStatus;
    const nextStatus = statusMap[status] || deals.platformEndStatus;

    const actionType = actionMap[status] || null;
    const actionMessage = actionMessageMap[status] || null;

    const handleNextAction = useAction(
        () => dealsActions.callNextAction({
            id,
            currentStatus: status,
            nextStatus,
            actionType,
            callback,
        }),
        [actionType, callback, id, nextStatus, status],
    );

    const pendingDeals = useSelector(({ deals }) => deals.pendingDeals);
    useEffect(
        () => {
            if (id && actionType === 'wait' && !pendingDeals[id])
                handleNextAction();
        },
        [pendingDeals, actionType, handleNextAction, id],
    );

    const statuses = useMemo(
        () => Object.keys(fullStatusMap),
        [fullStatusMap],
    );
    const activeStep = statuses.indexOf(currentStatus);

    const stepper = useMemo(
        () => statuses.map(status => (
            <Step key={status}>
                <StepLabel>{fullStatusMessageMap[status]}</StepLabel>
                {status !== deals.platformEndStatus && (
                    <StepContent>
                        <DealAction
                            id={id}
                            actionType={actionType}
                            actionMessage={actionMessage}
                            handleNextAction={handleNextAction}
                        />
                    </StepContent>
                )}
            </Step>
        )),
    [actionMessage, actionType, fullStatusMessageMap, handleNextAction, id, statuses],
    );

    return (
        <Stepper
            className='deal-history__wrapper '
            orientation='vertical'
            activeStep={activeStep}
        >
            { stepper }
        </Stepper>
    );
};

