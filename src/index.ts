import { initialUser } from "./components/base/constant";
import { DateShow } from "./components/base/DateShow";
import { Counter } from "./components/common/Counter";
import { UserCard } from "./components/common/User";
import { Popup } from "./components/common/Popup";
import { FormValidator } from "./components/common/FormValidator";
import { IUserCard } from "./components/base/types";

const formValidationConfig  = { 
  formSelector: '.form', 
  inputSelector: '.form__input', 
  submitBtn: '.popup__button', 
  inactiveButtonClass: 'popup__button_type_disabled', 
  inputErrorClass: 'form__input_type_error',
}
const form = document.querySelector<HTMLFormElement>('.form'); //форма в попапе

// Инстансы
const date = new DateShow('header__time');
const time = new DateShow('about__item-subtitle_time');
const counter = new Counter("counter", "list-elements");
const popup = new Popup('.popup');
const formValidator = new FormValidator(formValidationConfig, form as HTMLFormElement);

date.updateMonth();
time.updateTime();
counter.updateCounter();
popup.setEventListener();
formValidator.enableValidation();

// Общие элементы
const listElement = document.querySelector<HTMLElement>('#list-elements'); // контейнер, куда будут рендериться карточки с юзерами
const buttonMemberOpen = document.querySelector<HTMLButtonElement>('.member__add'); //кнопка открытия формы
const infoUserTop = Array.from(document.querySelectorAll<HTMLElement>(".info__text")); // инфа о пользователе верх
const infoUserCnt = Array.from(document.querySelectorAll<HTMLElement>(".info2__subtitle")); //инфа о пользователе центр

// Функции 
function createNewUser(data: IUserCard): HTMLElement { // Функция, которая создает нового пользователя и возвращает его карточку
  const userCard = new UserCard(data, '#user-card', infoUserTop, infoUserCnt);
  return userCard.createUserCard();
}

function addInitialCard(data: IUserCard): void { // Функция, которая добавляет карточку пользователя на страницу
  const cardElement = createNewUser(data);
  if (listElement) {
    listElement.appendChild(cardElement);
  }
}

initialUser.forEach(item => { // Обходим карточки пользователей из исходного массива
  addInitialCard(item);
});

function addNewCard(data: IUserCard): void { // Функция, которая добавляет карточку НОВОГО пользователя на страницу
  const birthdayParts = data.userBirthday.split('-');
  const formattedBirthday = `${birthdayParts[2]}.${birthdayParts[1]}.${birthdayParts[0]}`;
  const userWithFormattedBirthday = {
    ...data,
    userBirthday: formattedBirthday
  };
  const cardElement = createNewUser(userWithFormattedBirthday); // Добавляем НОВОГО пользователя на страницу
  if (listElement) {
    listElement.appendChild(cardElement);
  }
}

// Слушатели
buttonMemberOpen?.addEventListener('click', () => {
  popup.open();
})

form?.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(form); // Получаем данные из формы
  const userData = {
    userName: formData.get('name') as string,
    userEmail: formData.get('email') as string,
    userBirthday: formData.get('date') as string,
    userProfession: formData.get('profession') as string,
    userBudget: parseInt(formData.get('budget') as string, 10),
    userExperience: parseInt(formData.get('experience') as string, 10)
  };

  addNewCard(userData); // Добавляем новую карточку пользователя на страницу
  popup.close();
  form.reset();
})