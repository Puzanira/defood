import { mergeStateParts } from './utils';
import { client } from './client';
import { admin } from './admin';


export const state = mergeStateParts('main', {
    client,
    admin,
});
