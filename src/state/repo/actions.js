import { prefixTypes, createAction } from '../utils';


const types = prefixTypes('repo', {
    CLEAR_ALL: 'CLEAR_ALL',
    SET_STATUS: 'SET_STATUS',

    GET_REPO: 'GET_REPO',
    SET_REPO: 'SET_REPO',
    SET_REPO_TREE: 'SET_REPO_TREE',

    SET_FOLDER_FILE_MAP: 'SET_FOLDER_FILE_MAP',

    GO_TO_DIRECTORY: 'GO_TO_DIRECTORY',
    GO_FORWARD_TO_DIRECTORY: 'GO_FORWARD_TO_DIRECTORY',
    SET_CURRENT_DIRECTORY: 'SET_CURRENT_DIRECTORY',
    SET_CURRENT_DIRECTORY_CONTENT: 'SET_CURRENT_DIRECTORY_CONTENT',

    SET_TOTAL_CLOC: 'SET_TOTAL_CLOC',
    UPDATE_FILES: 'UPDATE_FILES',

    GET_FILE_CHECKED_STATUS: 'GET_FILE_CHECKED_STATUS',
    SET_CHECKED_FILE: 'SET_CHECKED_FILE',
    SET_CHECKED_FILES: 'SET_CHECKED_FILES',
    REMOVE_CHECKED_FILE: 'REMOVE_CHECKED_FILE',
    REMOVE_CHECKED_FILES: 'REMOVE_CHECKED_FILES',
    TOGGLE_CHECKED_FILE: 'TOGGLE_CHECKED_FILE',

    GET_FOLDER_CHECKED_STATUS: 'GET_FOLDER_CHECKED_STATUS',
    SET_CHECKED_FOLDER: 'SET_CHECKED_FOLDER',
    SET_CHECKED_FOLDERS: 'SET_CHECKED_FOLDERS',
    REMOVE_CHECKED_FOLDER: 'REMOVE_CHECKED_FOLDER',
    REMOVE_CHECKED_FOLDERS: 'REMOVE_CHECKED_FOLDERS',
    TOGGLE_CHECKED_FOLDER: 'TOGGLE_CHECKED_FOLDER',
});

export { types as repoActionTypes };

export const repoActions = {
    clearAll: createAction(types.CLEAR_ALL),
    setStatus: createAction(types.SET_STATUS),
    getRepo: createAction(types.GET_REPO),
    setRepo: createAction(types.SET_REPO),
    updateFiles: createAction(types.UPDATE_FILES),
    setRepoTree: createAction(types.SET_REPO_TREE),
    goToDirectory: createAction(types.GO_TO_DIRECTORY),
    goForwardToDirectory: createAction(types.GO_FORWARD_TO_DIRECTORY),
    setFolderFileMap: createAction(types.SET_FOLDER_FILE_MAP),
    setCurrentDirectory: createAction(types.SET_CURRENT_DIRECTORY),
    setCurrentDirectoryContent: createAction(types.SET_CURRENT_DIRECTORY_CONTENT),
    setTotalCloc: createAction(types.SET_TOTAL_CLOC),
    getFileCheckedStatus: createAction(types.GET_FILE_CHECKED_STATUS),
    toggleCheckedFile: createAction(types.TOGGLE_CHECKED_FILE),
    setCheckedFile: createAction(types.SET_CHECKED_FILE),
    setCheckedFiles: createAction(types.SET_CHECKED_FILES),
    removeCheckedFile: createAction(types.REMOVE_CHECKED_FILE),
    removeCheckedFiles: createAction(types.REMOVE_CHECKED_FILES),
    getFolderCheckedStatus: createAction(types.GET_FILE_CHECKED_STATUS),
    toggleCheckedFolder: createAction(types.TOGGLE_CHECKED_FOLDER),
    setCheckedFolder: createAction(types.SET_CHECKED_FOLDER),
    setCheckedFolders: createAction(types.SET_CHECKED_FOLDERS),
    removeCheckedFolder: createAction(types.REMOVE_CHECKED_FOLDER),
    removeCheckedFolders: createAction(types.REMOVE_CHECKED_FOLDERS),
};
