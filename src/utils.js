import fp from 'lodash/fp';
import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { config } from './config';


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

/**
 * Функция проверяет, является ли значение объектом.
 * @param {object} value
 * @returns {boolean}
 */
const isObject = value => (value ? value.constructor === Object : false);

const plainifyArray = (key, array) => {
    const reducer = (obj, index) => (
        Object.entries(obj).reduce((acc, current) => {
            const [childKey, childValue] = current;
            const newKey = `${key}.${index}.${childKey}`;
            return { ...acc, [newKey]: childValue };
        }, {})
    );

    return array.reduce((result, obj, index) => ({
        ...result,
        ...reducer(obj, index),
    }), {});
};

/**
 * Функция возвращает plain-объект
 * @param {object} entry - пара [ключ, значение]
 * @returns {object}
 */
const plainifyInner = entry => {
    const [key, value] = entry;

    if (value instanceof Array)
        return plainifyArray(key, value);

    if (!isObject(value))
        return { [key]: value };

    return Object.entries(plainify(value)).reduce((acc, currentValue) => {
        const [childKey, childValue] = currentValue;
        const newKey = `${key}.${childKey}`;
        return { ...acc, [newKey]: childValue };
    }, {});
};

/**
 * Функция превращает входной объект в plain-объект
 * @param {object} object – исходный объект
 * @returns {object} plain-объект
 */
export const plainify = object => {
    if (!isObject(object))
        return {};

    return Object.entries(object).reduce((acc, currentValue) => ({
        ...acc,
        ...plainifyInner(currentValue),
    }), {});
};

const reverseplainifyInner = (keys, value) =>
    keys.reduce((acc, item, index) => {
        if (keys.length === 1)
            return _.merge(acc, { [item]: value });
        if (index === 0 && index !== (keys.length - 1))
            return { ...acc, [item]: parseInt(keys[index + 1], 10) >= 0 ? [{}] : {} };
        if (index === (keys.length - 1) && !(parseInt(keys[index - 1], 10) >= 0)) {
            const temp = { [keys[index - 1]]: {} };

            temp[keys[index - 1]][item] = value;

            return _.merge(acc, temp);
        } if (parseInt(keys[index - 1], 10) >= 0) {
            const len = parseInt(keys[index - 1], 10);

            for (let i = 0; i < len; i++)
                acc[keys[0]].push({});

            acc[keys[0]][keys[index - 1]][item] = value;
            return acc;
        }
        return acc;
    }, {});

export const reversePlainify = object =>
    Object.entries(object).reduce((acc, obj) => {
        const [key, value] = obj;

        return _.merge(acc, reverseplainifyInner(key.split('.'), value));
    }, {});


export const getDeliveryTime = (zone, item) => zone === item ? config.time.fast : config.time.slow;
