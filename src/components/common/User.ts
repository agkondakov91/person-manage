import { IUserCard } from "../base/types";

export class UserCard implements IUserCard {
  userName: string;
  userEmail: string;
  userBirthday: string;
  userProfession: string;
  userBudget: number;
  userExperience: number;
  templateSelector: string;
  private _element: HTMLElement | null = null;
  private _infoUserTop: HTMLElement[] = [];
  private _infoUserCnt: HTMLElement[] = [];
  static activeUser: HTMLElement | null = null; //Статическое поле, отслеживающее текущего активного пользователя

  constructor(data: IUserCard, templateSelector: string, _infoUserTop: HTMLElement[], _infoUserCnt: HTMLElement[]) {
    this.userName = data.userName;
    this.userEmail = data.userEmail;
    this.userBirthday = data.userBirthday;
    this.userProfession = data.userProfession;
    this.userBudget = data.userBudget;
    this.userExperience = data.userExperience;
    this.templateSelector = templateSelector;
    this._infoUserTop = _infoUserTop;
    this._infoUserCnt = _infoUserCnt;
  }

  getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(this.templateSelector);
    return template?.content.querySelector(".member__person")?.cloneNode(true) as HTMLElement;
  }

  createUserCard(): HTMLElement {
    this._element = this.getTemplate();
    this._element.querySelector(".member__title")!.textContent = this.getShortName();
    this._element.querySelector(".member__email")!.textContent = this.userEmail;
    this.setEventListener();
    return this._element;
  }

  getShortName(): string {
    return this.userName.split(" ").slice(0, 2).join(" ");
  }

  setEventListener(): void {
    if (!this._element) return;
    this._element.addEventListener("click", evt => this.handleSelectCard(evt));
    this._element.querySelector(".member__delete")?.addEventListener("click", () => this.handleDeleteCard());
  }

  handleSelectCard(evt: MouseEvent): void {
    const selected = evt.currentTarget as HTMLElement;
    if (selected !== UserCard.activeUser) {
      if (UserCard.activeUser) {
        UserCard.activeUser.classList.remove("member__person_active");
      }
      selected.classList.add("member__person_active");
      UserCard.activeUser = selected;
      this.showUserInfo()
    }
  }

  handleDeleteCard(): void {
    if (!this._element) return;
    this._element.remove();
    this.clearUserInfo();
  }

  private clearUserInfo(): void {
    this._infoUserTop.forEach(item => item.textContent = '');
    this._infoUserCnt.forEach(item => item.textContent = '');
  }

  showUserInfo(): void {
    const formatter = new Intl.NumberFormat("ru", { useGrouping: true }); // преобразование числа в российский формат

    const userInfoTop = [
      `${this.userName}`,
      `${this.getAge(this.userBirthday)}`,
      `${this.userProfession}`,
      `${this.userExperience}`,
      `15 августа 2024`,
      `${this.getEfficient()}`,
    ];
    const userInfoCnt = [
      `MSC`,
      `${this.changeBirthday()}`,
      `${formatter.format(this.userBudget)}`,
    ];

    this._infoUserTop.forEach((item, index) => {
      item.textContent = userInfoTop[index];
    })

    this._infoUserCnt.forEach((item, index) => {
      item.textContent = userInfoCnt[index];
    })
  }

  getEfficient(): string {
    const age: number = this.getAge(this.userBirthday);
    return `${Math.floor((this.userExperience / age) * 100)}%`;
  }

  changeBirthday(): string {
    return this.userBirthday.split(".").slice(0, 2).join(".");
  }

  getAge(birthday: string | undefined) {
    if (!birthday) return 0;
    const date = birthday.split(".");
    const dateParse = new Date(
      parseInt(date[2]),
      parseInt(date[1]) - 1,
      parseInt(date[0])
    );
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dateParse.getFullYear();
    const currentAge =
      currentDate.getMonth() > dateParse.getMonth() ||
      (currentDate.getMonth() === dateParse.getMonth() &&
        currentDate.getDate() >= dateParse.getDate());
    if (!currentAge) age--;
    return age;
  }
}