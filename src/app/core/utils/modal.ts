declare const $: any;
export class Modal {
    static showModal(idModal: string): void {
        $(idModal).modal('show');
    }

    static hideModal(idModal: string): void {
        $(idModal).modal('hide');
    }
}