import { Module } from "../core/module.js";
import { explosion } from "../utils.js";

export class TimerModule extends Module {
  constructor(isExplosion = false) {
    super("timers", "Создать таймер");

    this.isExplosion = isExplosion;
    this.countDownElement = null;
    this.permissionToDelete = false;
    this.timerId = null;
    this.timerStarted = false;
  }

  trigger() {
    this.createTimer();
  }

  createArrayOfOptions(arrayOfOptions, selectLength) {
    for (let i = 0; i < selectLength; i++) {
      let item = null;
      if (i >= 10) {
        item = i;
      } else {
        item = "0" + i;
      }
      arrayOfOptions.push(item);
    }
  }

  start(miliseconds) {
    this.timerStarted = true;
    this.createCounterBlock();
    this.emphasize(miliseconds);
    this.displayCounterValue(miliseconds);

    this.timerId = setInterval(() => {
      miliseconds -= 1000;

      this.displayCounterValue(miliseconds);

      this.emphasize(miliseconds);

      if (miliseconds < 0) {
        this.stop();
        this.timerStarted = false;
        if (this.isExplosion) {
          explosion();
        }
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
    this.$counterElement.remove();
  }

  emphasize(timer) {
    if (timer <= 3000) {
      this.$counterElement.classList.add("timer-last-five-second");
    }
  }

  displayCounterValue(timer) {
    let seconds = Math.floor(timer / 1000) % 60;
    let minutes = Math.floor(timer / 1000 / 60) % 60;
    let hours = Math.floor(timer / 1000 / 60 / 60) % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    this.$counterElement.textContent = `${hours}:${minutes}:${seconds} `;
  }

  createCounterBlock() {
    const countDownEl = document.createElement("div");
    countDownEl.className = "timer";
    this.countDownElement = countDownEl;
    document.body.append(countDownEl);

    this.$counterElement = countDownEl;
  }

  createTimer() {
    const modalTimer = document.createElement("div");
    modalTimer.className = "modal-timer";

    // Основной контент модального окна
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalTimer.append(modalContent);

    // Header модального окна
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header ";
    modalContent.append(modalHeader);

    // Закрыть модальное окно (крестик)
    const modalTimerClose = document.createElement("button");
    modalTimerClose.className = "modal-timer-close";
    modalTimerClose.textContent = "Х";
    modalContent.append(modalTimerClose);

    // Скрыть модальное окно по нажатии на крестик
    modalTimerClose.addEventListener("click", () => {
      modalTimer.hidden = " ";
    });

    // Описание хедера модалки
    const modalHeaderTitle = document.createElement("h2");
    modalHeaderTitle.className = "modal-header-title";
    modalHeaderTitle.textContent = "Настройки таймера";
    modalHeader.append(modalHeaderTitle);

    // Контейнер для Селектов Часы/Минуты/Секунды
    const timeSelectorWrapper = document.createElement("div");
    timeSelectorWrapper.className = "form-timer-group";
    modalContent.append(timeSelectorWrapper);

    // Селект: часы
    const hoursSelectorTitle = document.createElement("label");
    hoursSelectorTitle.className = "time-selector-title";
    hoursSelectorTitle.textContent = "Часы";
    timeSelectorWrapper.append(hoursSelectorTitle);

    const hoursSelector = document.createElement("select");
    hoursSelector.className = "hours-selector";
    timeSelectorWrapper.append(hoursSelector);

    // Заполнение Селекта "Часы" массивом option
    const arrayOfOptionsHours = [];
    this.createArrayOfOptions(arrayOfOptionsHours, 24);

    for (const valueHour of arrayOfOptionsHours) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueHour) * 1000 * 60 * 60;
      selectItem.innerHTML = valueHour;
      hoursSelector.append(selectItem);
    }

    // Селект: "Минуты"
    const minutesSelectorTitle = document.createElement("label");
    minutesSelectorTitle.className = "time-selector-title";
    minutesSelectorTitle.textContent = "Минуты";
    timeSelectorWrapper.append(minutesSelectorTitle);

    const minutesSelector = document.createElement("select");
    minutesSelector.className = "minutes-selector";
    timeSelectorWrapper.append(minutesSelector);

    // Заполнение Селекта "Минуты" массивом option
    const arrayOfOptionsMinutes = [];
    this.createArrayOfOptions(arrayOfOptionsMinutes, 60);

    for (const valueMinute of arrayOfOptionsMinutes) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueMinute) * 1000 * 60;

      selectItem.innerHTML = valueMinute;
      minutesSelector.append(selectItem);
    }

    // Селект: "Секунды"
    const secondsSelectorTitle = document.createElement("label");
    secondsSelectorTitle.className = "time-selector-title";
    secondsSelectorTitle.textContent = "Секунды";
    timeSelectorWrapper.append(secondsSelectorTitle);

    const secondsSelector = document.createElement("select");
    secondsSelector.className = "seconds-selector";
    timeSelectorWrapper.append(secondsSelector);

    // Заполнение селекта Секунды массивом option
    const arrayOfOptionsSeconds = [];
    this.createArrayOfOptions(arrayOfOptionsSeconds, 60);

    for (const valueSecond of arrayOfOptionsSeconds) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueSecond) * 1000;
      selectItem.innerHTML = valueSecond;
      secondsSelector.append(selectItem);
    }

    // Кнопка "Остановить таймер"
    const buttonStopTimer = document.createElement("button");
    buttonStopTimer.className = "btn-stop-timer";
    buttonStopTimer.innerHTML = `Остановить <br> таймер`;
    modalContent.append(buttonStopTimer);

    // Обработка кнопки "Остановить таймер"
    buttonStopTimer.addEventListener("click", () => {
      this.stop();
      this.countDownElement.remove();
      this.modal.remove();
    });

    // Кнопка ОК модального окна
    const submitSelectTime = document.createElement("button");
    submitSelectTime.className = "btn-submit-select";
    submitSelectTime.textContent = "ОК";
    modalContent.append(submitSelectTime);

    // Обработка кнопки ОК, после нажатия которой запускается таймер.
    submitSelectTime.addEventListener("click", () => {
      this.permissionToDelete = true;
      let finalValueMsTime =
        Number(hoursSelector.value) +
        Number(minutesSelector.value) +
        Number(secondsSelector.value);
      modalTimer.hidden = " ";
      this.start(Number(finalValueMsTime), false);
    });

    document.body.append(modalTimer);
    this.timerActive = true;
    this.modal = modalTimer;
  }
}
