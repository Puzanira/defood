import axios from 'axios';
import qs from 'qs';
import fp from 'lodash/fp';

import { NotAuthorizedError, ForbiddenError, UnknownError, NotFoundError } from './errors';


export const contentTypeJson = 'application/json';

const mayHaveBody = method =>
    ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase());

export const rawRequest = async request => {
    const response =
        await axios(request).catch(error => error.response);

    switch (response.status) {
        case 200:
        case 201:
        case 202:
        case 304:
        case 204:
            return response;

        case 401:
            throw new NotAuthorizedError(response);
        case 403:
            throw new ForbiddenError(response);
        case 404:
            throw new NotFoundError(response);

        case 400:
        case 500:
        default:
            throw new UnknownError(response);
    }
};

export const request = async ({
      basePath,
      apiPath,
      url,
      path = '',
      query = {},
      method,
      headers = {},
      responseType,
      contentType = contentTypeJson,
      onDownloadProgress,
      onUploadProgress,
      body,
      setCancel,
  }) => {
    if (!url)
        throw new Error('Url is not specified');

    const hasBody = body !== undefined;

    if (hasBody && !mayHaveBody(method))
        throw new Error('Incorrect body or method usage');

    const requestQuery = qs.stringify(query, { arrayFormat: 'repeat' });

    const requestUrl = fp.pipe(
        fp.filter(fp.identity),
        fp.join(''),
    )([
        basePath,
        apiPath,
        '/',
        url,
        path && '/',
        path,
        requestQuery && '?',
        requestQuery,
    ]);

    const requestParameters = {
        url: requestUrl,
        method,
        headers: {
            Accept: contentTypeJson,
            ...hasBody && { 'Content-Type': contentType },
            ...headers,
        },
        ...hasBody && {
            data: contentType === contentTypeJson
                ? JSON.stringify(body)
                : body,
        },
        responseType,
        onDownloadProgress,
        onUploadProgress,
        ...setCancel && {
            cancelToken: new axios.CancelToken(setCancel),
        },
    };

    return rawRequest(requestParameters);
};

const method = name =>
    transform =>
        args => request({
            ...args,
            ...transform(args),
            method: name,
        });

export const get = method('GET');
export const post = method('POST');
export const put = method('PUT');
export const patch = method('PATCH');
export const remove = method('DELETE');

export const withUrl = url => (args = {}) => ({ ...args, url });
