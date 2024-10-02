import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";

export  enum BUTTON_COLOR {
    PRIMARY = "#dead00",
    SECONDARY = "#060e7b",
    TERTIARY = "#5c77cf",
    SUCCESS = "#1AAA3E",
    INFO = "#3088fb",
    WARNING = "#ffc107",
    DELETE = "#d33",
    DANGER = "#ff5757"
}
export interface AlertParams {
    html: string;
    title?: string;
    icon?: SweetAlertIcon;
    confirmButtonColor?: BUTTON_COLOR;
    confirmButtonText: string;
    cancelButtonText?:  string,
    cancelButtonColor?: BUTTON_COLOR;
    showCancelButton?: boolean

}

export class Alerts {
    private constructor() {}

    static customized(params: AlertParams): Promise<SweetAlertResult> {
        return Swal.fire({
            title: params.title || 'Alerta',
            html: params.html,
            icon: params.icon || 'info',
            confirmButtonText: params.confirmButtonText || 'Aceptar',
            confirmButtonColor: params.confirmButtonColor || BUTTON_COLOR.SUCCESS,
            cancelButtonText:  params.cancelButtonText || 'Cancelar',
            showCancelButton: params.showCancelButton || false
        });
    }
}