import { mapToArray, mapToObject } from './utils';


export class Deal {
    constructor({
            queueId,
            localDealId,
            dealId,
            history,
            kind,
            status,
            parties = [],
            parameters,
            transitions = [],
            files = [],
                }) {
        Object.defineProperty(this, 'transitions', {
            enumerable: false,
            writable: true,
        });

        Object.defineProperty(this, '_parametersArray', {
            enumerable: false,
            writable: true,
        });

        Object.defineProperty(this, '_parametersObject', {
            enumerable: false,
            writable: true,
        });

        Object.defineProperty(this, 'parameters', {
            enumerable: true,
            get() { return this._parametersObject; },
            set(parameters) {
                if (Array.isArray(parameters)) {
                    this._parametersArray = parameters;
                    this._parametersObject = this.mapParametersToObject();
                } else if (typeof parameters === 'object') {
                    this._parametersObject = parameters;
                    this._parametersArray = this.mapParametersToArray();
                }
            },
        });

        this.queueId = queueId;
        this.localDealId = localDealId;
        this.dealId = dealId;
        this.history = history;
        this.kind = kind;
        this.status = status;
        this.parties = parties;
        this.parameters = parameters;
        this.transitions = transitions;
        this.files = files;
    }

    mapParametersToArray() {
        return mapToArray(this._parametersObject);
    }

    mapParametersToObject() {
        return mapToObject(this._parametersArray);
    }

    // Used to serialize data to be send to server in array form
    toJSON() {
        return {
            kind: this.kind,
            status: this.status,
            parties: this.parties,
            parameters: this._parametersArray,
            transitions: this.transitions,
        };
    }
}
