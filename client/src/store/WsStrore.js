import {makeAutoObservable} from "mobx"

export default class wsStore {
    constructor() {
        this._socket = []

        makeAutoObservable(this)
    }

    get socket() {
        return this._socket;
    }
    setWs(ws) {
        this._socket = ws;
    }


}