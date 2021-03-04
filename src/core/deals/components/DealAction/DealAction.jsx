import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Button } from '@material-ui/core';
import './DealAction.css';


export const DealAction = ({
    id,
    actionMessage,
    actionType,
    handleNextAction,
}) => {
    const pendingDeals = useSelector(({ deals }) => deals.pendingDeals);
    const [loading, setLoading] = useState(false);
    useEffect(
        () => {
            const isLoading = _.includes(pendingDeals, id);
            setLoading(isLoading);
        },
        [id, pendingDeals],
    );

    return (
        <div className='deal-action'>
            <div className='deal-action__title'>{actionMessage}</div>
            {actionType === 'wait' && (
                <CircularProgress />
            )}
            {actionType === 'update' && (
                <div className='deal-action__buttons'>
                    <Button
                        variant='contained'
                        color='primary'
                        className='deal-action__button'
                        disabled={loading}
                        onClick={() => handleNextAction(id)}
                    >
                        Ок
                    </Button>
                    {loading && (
                        <CircularProgress size={24} className='deal-action__button-progress' />
                    )}
                </div>
            )}
        </div>
    );
};
