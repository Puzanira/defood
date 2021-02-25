import { mergeStateParts } from './utils';
import { client } from './client';
import { admin } from './admin';
import { deals } from './deals';


export const state = mergeStateParts('main', {
    client,
    admin,
    deals,
});
