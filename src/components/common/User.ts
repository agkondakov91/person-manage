import { IUser } from "../base/types";

export class User {
  name: string;
  birthday?: number;
  email: string;
  profession?: string;
  budget?: number;
  experience?: number;
  templateSelector: string;
  element: HTMLElement | null = null;
  
  constructor(data: IUser, templateSelector: string) {
    this.name = data.userName;
    this.birthday = data.userBirthday;
    this.email = data.userEmail;
    this.profession = data.userProfession;
    this.budget = data.userBudget;
    this.experience = data.userExperience;
    this.templateSelector = templateSelector;
  }
  
  getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(this.templateSelector);
    if (!template) throw new Error('Темплейта нет в разметке');
    return template.content.querySelector('.member__person')!.cloneNode(true) as HTMLElement;
  }
  
  createUserCard(): HTMLElement {
    this.element = this.getTemplate();
    this.element.querySelector('.member__title')!.textContent = this.getShortName();
    this.element.querySelector('.member__email')!.textContent = this.getEmail();
    this.setEventListeners();
    return this.element;
  }
  
  getShortName(): string {
    return this.name.split(' ').slice(0, 2).join(' ');
  }
  
  getEmail(): string {
    return this.email;
  }
  
  setEventListeners() {
    if (!this.element) return;
    this.element.addEventListener('click', (evt) => {
      this.handleUserCardSelect(evt);
    })
    this.element.querySelector('.member__delete')!.addEventListener('click', () => {
      this.handleUserCardDelete();
    })
  }
  
  handleUserCardSelect(evt: MouseEvent): void {
    const activeCard = document.querySelector<HTMLElement>('.member__person_active');
    if (activeCard) {
      activeCard.classList.remove('member__person_active');
    }
    (evt.currentTarget as HTMLElement).classList.add('member__person_active');
  }
  
  handleUserCardDelete(): void {
    if (!this.element) return;
    this.element.remove();
  }
}