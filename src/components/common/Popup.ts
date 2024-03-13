import { IPopup } from "../base/types";

export class Popup implements IPopup {
  popup: HTMLElement | null;
  closeBtn: HTMLButtonElement | null;
  closeEsc: boolean = false;
  
  constructor(popupSelector: string) {
    this.popup = document.querySelector(popupSelector); //нашли попап
    this.closeBtn = this.popup?.querySelector<HTMLButtonElement>('.popup__close')!; //кнопка закрытия попапа
  }
  
  open(): void {
    document.addEventListener('keydown', this.handleEscClose);
    this.popup?.classList.add('popup_open');
  }
  
  close(): void {
    document.removeEventListener('keydown', this.handleEscClose);
    this.popup?.classList.remove('popup_open');
  }
  
  handleEscClose = (evt: KeyboardEvent): void => {
    if (evt && evt.key === 'Escape') {
      this.close();
    }
  }
  
  setEventListener(): void {
    this.closeBtn?.addEventListener('click', () => this.close());
    this.popup?.addEventListener('mousedown', evt => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}