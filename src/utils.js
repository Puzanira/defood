import fp from 'lodash/fp';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export const MOBILE_WIDTH = 480;

export const useNavigate = route => {
    const { push } = useHistory();
    return useCallback(() => push(route), [push, route]);
};

/* ACTION UTILS */
export const useAction = (action, deps) => {
    const dispatch = useDispatch();
    return useMemo(
        () => fp.pipe(action, dispatch),
        [action, dispatch],
    );
};
