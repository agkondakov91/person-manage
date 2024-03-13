import { IUserCard } from "./types"

export const initialUser: IUserCard[] = [
  {
    userName: "Иванов Иван Иванович",
    userEmail: "ivanivanov@pm.com",
    userBirthday: '23.11.1978',
    userProfession: 'Владелец продукта',
    userBudget: 250000,
    userExperience: 25
  },
  {
    userName: "Петров Петр Петрович",
    userEmail: "petrovpetr@pm.com",
    userBirthday: '24.07.1988',
    userProfession: 'Менеджер продукта',
    userBudget: 170000,
    userExperience: 17
  },
  {
    userName: "Козлов Виктор Викторович",
    userEmail: "kozlovviktor@pm.com",
    userBirthday: '07.02.1998',
    userProfession: 'Motion designer',
    userBudget: 120000,
    userExperience: 8
  },
]