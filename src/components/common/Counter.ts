import { ICounter } from "../base/types";

export class Counter implements ICounter {
  container: HTMLElement | null;
  countElement: HTMLElement;
  list: HTMLElement;

  constructor(containerId: string, listId: string) {
    this.container = document.getElementById(containerId);
    this.countElement = this.container!.querySelector<HTMLElement>("#count")!;
    this.list = document.getElementById(listId)!;

    this.updateCounter();

    const observer = new MutationObserver(() => { // Используем MutationObserver для отслеживания изменений в узлах DOM
      this.updateCounter(); // при каждом изменении будет вызываться метод updateCounter()
    });
    // observe - метод, ведущий наблюдение за указанным узлом (this.list)
    // второй аргумент - объект конфигураций (какие изменения отслеживать):
    // childList - свойство, говорящее о необходимости отслеживания добавления/удаления дочерних узлов в целевом узле
    observer.observe(this.list, { childList: true });
  }

  updateCounter(): void {
    const count = this.list?.children.length;
    if (!count) {
      this.countElement!.textContent = "0";
    }
    this.countElement!.textContent = `${count}`;
  }
}