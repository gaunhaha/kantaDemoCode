import Swal, { type SweetAlertIcon, type SweetAlertResult } from "sweetalert2";

export interface OkCancelOption {
  title: string;
  text?: string;
  confirmButtonText?: string;
  denyButtonText?: string;
  html?: string;
  icon?: SweetAlertIcon;
}
export interface OkOption {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  icon?: SweetAlertIcon;
  html?: string;
}


export interface CustomImgOkOption {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  imageUrl: string;
  imageHeight: number,
}

const confirmButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
const denyButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

export class AlertService {

  static visible: boolean = false;

  static async okCancelAlert(option: OkCancelOption): Promise<SweetAlertResult> {
    if (AlertService.visible) return {} as SweetAlertResult;
    AlertService.visible = true;
    const result = await Swal.fire({
      title: option.title,
      text: option.text ?? "",
      html: option.html ?? "",
      icon: option.icon ?? "warning",
      buttonsStyling: false,
      confirmButtonText: option.confirmButtonText ?? "confirm",
      denyButtonText: option.denyButtonText ?? "cancel"
      ,
      showDenyButton: true,
      heightAuto: false,
      reverseButtons: true,
      customClass: {
        confirmButton: confirmButtonClass,
        denyButton: denyButtonClass,
      },
    });
    AlertService.visible = false;
    return result;
  }

  static async okAlert(option: OkOption): Promise<SweetAlertResult> {
    if (AlertService.visible) return {} as SweetAlertResult;
    AlertService.visible = true;
    const result = await Swal.fire({
      title: option.title ? option.title : "",
      text: option.text ?? "",
      html: option.html ?? "",
      icon: option.icon ?? "success",
      buttonsStyling: false,
      confirmButtonText: option.confirmButtonText ?? "confirm",
      heightAuto: false,
      reverseButtons: true,
      customClass: {
        confirmButton: confirmButtonClass,
      },
    });
    AlertService.visible = false;
    return result;
  }

  static async customOkAlert(option: CustomImgOkOption): Promise<SweetAlertResult> {
    if (AlertService.visible) return {} as SweetAlertResult;
    AlertService.visible = true;
    const result = await Swal.fire({
      title: option.title ? option.title : "",
      text: option.text ?? "",
      buttonsStyling: false,
      confirmButtonText: option.confirmButtonText ?? "confirm",
      imageUrl: option.imageUrl,
      imageHeight: option.imageHeight,
      heightAuto: false,
      reverseButtons: true,
      customClass: {
        confirmButton: confirmButtonClass,
      },
    });
    AlertService.visible = false;
    return result;
  }

  static async imageAlert(imageUrl: string) {
    if (AlertService.visible) return {} as SweetAlertResult;
    AlertService.visible = true;
    const result = await Swal.fire({
      imageUrl: imageUrl,
      buttonsStyling: false,
      customClass: {
        confirmButton: confirmButtonClass,
      },
    });
    AlertService.visible = false;
    return result;
  }
}
