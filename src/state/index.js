import { mergeStateParts } from '../core/state/utils';
import { client } from './client';
import { admin } from './admin';
import { orders } from './orders';
import { deals } from '../core/deals/state';
import { auth } from '../core/auth/state';


export const state = mergeStateParts('main', {
    client,
    admin,
    orders,
    deals,
    auth,
});
