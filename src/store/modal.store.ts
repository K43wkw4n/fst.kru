
import { makeAutoObservable } from 'mobx';

export class ModalStore {
    open: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    openModal = () => {
        this.open = true;
    }

    closeModal = () => {
        this.open = false;
    };

}