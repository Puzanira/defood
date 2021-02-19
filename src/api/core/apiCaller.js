import fp from 'lodash/fp';

import { contentTypeJson } from './request';
import { config } from '../../config';
import { errorFormatter, UnknownError } from './errors';


export const checkContentType = (response, contentType) => fp.pipe(
    fp.defaultTo(''),
    fp.split('; '),
    fp.first,
    fp.defaultTo(''),
    fp.toLower,
    fp.isEqual(contentType),
)(response.headers['content-type']);

const readBlobJson = blob => new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.onload = () => {
        try {
            resolve(JSON.parse(reader.result));
        } catch (err) {
            reject(err);
        }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
});

const getResponseAsJSON = async response => {
    let json = checkContentType(response, contentTypeJson) && response.data;
    if (json instanceof window.Blob && json.type === contentTypeJson)
        json = await readBlobJson(json);
    return json;
};

export const wrapRequest = async (request, { saveAs, ...args } = {}) => {
    try {
        const response = await request(args);
        const data = await getResponseAsJSON(response) || response.data;
        switch (response.status) {
            case 200:
            case 201:
            case 202:
            case 304:
                return data;
            case 204:
                return undefined;
            default:
                throw new UnknownError(response);
        }
    } catch (error) {
        const json = await getResponseAsJSON(error.response);
        switch (error.response.status) {
            case 413:
                throw new Error(errorFormatter('tooLarge'));
            case 400:
            case 404:
            case 500:
                if (json && json.message) {
                    error.message = json.message;
                    break;
                }
            // falls through
            default:
                error.message = errorFormatter(error.message) || error.message;
                if (error instanceof UnknownError && error.response)
                    error.message += ` (HTTP ${error.response.status})`;
                break;
        }
        throw error;
    }
};

export const createApiCaller =
    params =>
        (apiCall, args) => apiCall({
            ...args,
            ...fp.isFunction(params)
                ? params(args)
                : params,
        });

const webApiCaller = createApiCaller(({ headers, node }) => ({
    apiPath: `${config.apiScheme}${node && `${node}.`}${config.apiPath}`,
    headers: {
        'Accept-Language': window.localStorage.getItem('language'),
        'x-api-version': config.xApiVersion,
        'Channel': config.channel,
        'Authorization': config.authorization,
        ...headers,
    },
}));

export const callApi = (apiCall, node, callArgs) =>
    wrapRequest(args => webApiCaller(apiCall, { ...args, node }), callArgs);

const globalNode = process.env.REACT_APP_NODE;
export const callNodeApi = (apiCall, callArgs) =>
    callApi(apiCall, globalNode, callArgs);
