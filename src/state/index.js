import { mergeStateParts } from './utils';
import { repo } from './repo';
import { client } from './client';
import { admin } from './admin';


export const state = mergeStateParts('main', {
    repo,
    client,
    admin,
});
