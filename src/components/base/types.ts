// Интерфейс класса DateShow
export interface IDateShow {
  timeFormat: Element;
  updateMonth(): string;
  updateTime(): string;
}

// Интерфейс класса UserCard
export interface IUserCard {
  userName: string;
  userEmail: string;
  userBirthday: string;
  userProfession: string;
  userBudget: number;
  userExperience: number;
}

// Интерфейс класса Popup
export interface IPopup {
  open(): void;
  close(): void;
  handleEscClose(evt: KeyboardEvent): void;
  setEventListener(): void;
}

// Интерфейс класса FormValidationConfig
export interface IFormValidationConfig {
  formSelector: string, 
  inputSelector: string, 
  submitBtn: string, 
  inactiveButtonClass: string, 
  inputErrorClass: string,
}

// Интерфейс класса Counter
export interface ICounter {
  container: HTMLElement | null;
  countElement: HTMLElement;
  list: HTMLElement;
  updateCounter(): void;
}