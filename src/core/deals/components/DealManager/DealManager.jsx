import React, { useMemo } from 'react';

import './DealManager.css';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import StepContent from '@material-ui/core/StepContent';

import { deals } from '../../constants';
import { useAction } from '../../../../utils';
import { dealsActions } from '../../state/actions';
import { DealAction } from '../DealAction';


export const DealManager = ({
    id,
    currentStatus,
    transferParameters,
    actionCallback,
}) => {
    const {
        statusMap,
        statusMessageMap,
        actionMap,
        actionMessageMap,
    } = transferParameters;

    const fullStatusMessageMap = { ...statusMessageMap, ...deals.platformStatusMessages };
    const fullStatusMap = { ...statusMap, [deals.platformEndStatus]: null };

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
            actionCallback,
        }),
        [actionType, actionCallback, id, nextStatus, status],
    );

    const statuses = useMemo(
        () => Object.keys(fullStatusMap),
        [fullStatusMap],
    );
    const activeStep = statuses.indexOf(currentStatus);

    const stepper = statuses.map(status => (
        <Step key={status}>
            <StepLabel>{fullStatusMessageMap[status]}</StepLabel>
            <StepContent>
                <DealAction
                    id={id}
                    actionType={actionType}
                    actionMessage={actionMessage}
                    handleNextAction={handleNextAction}
                />
            </StepContent>
        </Step>
    ));

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

