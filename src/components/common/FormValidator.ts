import { IFormValidationConfig } from "../base/types";

export class FormValidator {
  private config: IFormValidationConfig;
  private form: HTMLFormElement;
  private submitBtn: HTMLButtonElement;
  private inputList: HTMLInputElement[];

  constructor(config: IFormValidationConfig, form: HTMLFormElement) {
    this.config = config;
    this.form = form;
    this.submitBtn = this.form.querySelector<HTMLButtonElement>(
      this.config.submitBtn
    )!;
    this.inputList = Array.from(
      this.form.querySelectorAll<HTMLInputElement>(this.config.inputSelector)
    );
  }

  public showInputErr(inputElem: HTMLInputElement, errorMessage: string) {
    inputElem.classList.add(this.config.inputErrorClass);
    const errorElem = this.form.querySelector<HTMLElement>(
      `#${inputElem.id}-error`
    );
    if (errorElem) {
      errorElem.textContent = errorMessage;
    }
  }

  public hideInputErr(inputElem: HTMLInputElement) {
    inputElem.classList.remove(this.config.inputErrorClass);
    const errorElem = this.form.querySelector<HTMLElement>(
      `#${inputElem.id}-error`
    );
    if (errorElem) {
      errorElem.textContent = "";
    }
  }

  public checkInputValidity(inputElem: HTMLInputElement) {
    if (!inputElem.validity.valid) {
      this.showInputErr(inputElem, inputElem.validationMessage);
    } else {
      this.hideInputErr(inputElem);
    }
  }

  public enableSubmitBtn() {
    this.submitBtn.classList.remove(this.config.inactiveButtonClass);
    this.submitBtn.disabled = false;
  }

  public disableSubmitBtn() {
    this.submitBtn.classList.add(this.config.inactiveButtonClass);
    this.submitBtn.disabled = true;
  }

  public toggleBtnState() {
    const allInputsValid = this.inputList.every(
      (inputElem) => inputElem.validity.valid
    );
    if (allInputsValid) {
      this.enableSubmitBtn();
    } else {
      this.disableSubmitBtn();
    }
  }

  public setEventListener() {
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.checkInputValidity(input);
        this.toggleBtnState();
      });
    });
  }

  public enableValidation() {
    this.form.addEventListener("submit", (evt: Event) => {
      evt.preventDefault();
      this.toggleBtnState();
    });

    this.form.addEventListener("reset", () => {
      this.inputList.forEach((input) => {
        this.hideInputErr(input);
      });
      this.disableSubmitBtn();
    });

    this.setEventListener();
    this.toggleBtnState();
  }
}