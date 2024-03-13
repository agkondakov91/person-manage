import { IDateShow } from "./types";

export class DateShow implements IDateShow {
  timeFormat: Element;

  constructor(private element: string) {
    const timeFormat = document.querySelector(`.${this.element}`);
    if (!timeFormat) {
      throw new Error("Time zone is not found");
    }
    this.timeFormat = timeFormat;
  }

  updateMonth(): string {
    const dateNow = new Date();
    const formate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setInterval(() => {
      this.updateMonth();
    }, 60000);

    return (this.timeFormat.textContent = formate.format(dateNow));
  }

  updateTime(): string {
    const dateNow = new Date();
    const formate = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    setInterval(() => {
      this.updateTime();
    }, 1000);

    return (this.timeFormat.textContent = formate.format(dateNow));
  }
}