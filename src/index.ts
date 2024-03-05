import { initialUser } from "./components/base/constant";
import { IUser } from "./components/base/types";
import { User } from "./components/common/User";

const listElement = document.querySelector<HTMLElement>("#list-elements");

function createNewUser(data: IUser): HTMLElement {
  const userCard = new User(data, "#user-card");
  return userCard.createUserCard();
}

function addNewCard(userData: IUser): void {
  const cardElement = createNewUser(userData);
  if (listElement) {
    listElement.appendChild(cardElement);
  }
}

initialUser.forEach((item) => {
  addNewCard(item)
});