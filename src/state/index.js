import { mergeStateParts } from './utils';
import { client } from './client';
import { admin } from './admin';
import { delivery } from './delivery';


export const state = mergeStateParts('main', {
    client,
    admin,
    delivery,
});
