import { plainify, reversePlainify } from '../../../utils';


export const mapToArray = object => {
    const plainParameters = plainify(object);
    return Object.entries(plainParameters).map(([key, value]) => ({
        key, value,
    }));
};

export const mapToObject = array => {
    const plainObject = array.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {});
    return reversePlainify(plainObject);
};
