import { Module } from "../core/module.js";
import { explosion } from "../utils.js";


export class TimerModule extends Module {
  constructor() {
    super("timers", "Создать таймер");
  }

  trigger() {
    {
      this.createTimer();
    }
  }

  // Метод обратного отсчета (применим для интегрирования)
  startCountDown(ms, isExplosion = false) {
    let timer = ms;

    const countDownEl = document.createElement("div");
    countDownEl.className = "timer";
    document.body.append(countDownEl);

    let timerId = setInterval(() => {
      let seconds = Math.floor(timer / 1000) % 60;
      let minutes = Math.floor(timer / 1000 / 60) % 60;
      let hours = Math.floor(timer / 1000 / 60 / 60) % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      hours = hours < 10 ? "0" + hours : hours;
      countDownEl.textContent = `${hours}:${minutes}:${seconds} `;
      timer -= 1000;
      if (timer <= 4000) {
        countDownEl.classList.add("timer-last-five-second");
      }
      if (timer < 0) {
        clearInterval(timerId);

				if (isExplosion) {
					explosion();
				}

        countDownEl.remove();
        return;
      }
    }, 1000);
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
    const valuesHours = [];
    for (let i = 0; i < 24; i++) {
      let item = null;
      if (i >= 10) {
        item = i;
      } else {
        item = "0" + i;
      }
      valuesHours.push(item);
    }

    for (const valueHour of valuesHours) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueHour) * 1000 * 60 * 60;

      selectItem.innerHTML = valueHour;
      console.log("value:", selectItem.value);
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
    const valuesMinutes = [];
    for (let i = 0; i < 60; i++) {
      let item = null;
      if (i >= 10) {
        item = i;
      } else {
        item = "0" + i;
      }
      valuesMinutes.push(item);
    }

    for (const valueMinute of valuesMinutes) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueMinute) * 1000 * 60;

      selectItem.innerHTML = valueMinute;
      console.log("value:", selectItem.value);
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
    const valuesSeconds = [];
    for (let i = 0; i < 60; i++) {
      let item = null;
      if (i >= 10) {
        item = i;
      } else {
        item = "0" + i;
      }
      valuesSeconds.push(item);
    }

    for (const valueSecond of valuesSeconds) {
      const selectItem = document.createElement("option");
      selectItem.value = Number(valueSecond) * 1000;
      selectItem.innerHTML = valueSecond;
      console.log("value:", selectItem.value);
      secondsSelector.append(selectItem);
    }

    // Кнопка ОК модального окна
    const submitSelectTime = document.createElement("button");
    submitSelectTime.className = "btn-submit-select";
    submitSelectTime.textContent = "ОК";
    modalContent.append(submitSelectTime);

    // Обработка кнопки ОК, после нажатия которой запускается таймер.
    submitSelectTime.addEventListener("click", () => {
      modalTimer.hidden = " ";
      let finalValueMsTime =
        Number(hoursSelector.value) +
        Number(minutesSelector.value) +
        Number(secondsSelector.value);
      this.startCountDown(Number(finalValueMsTime), true);
    });

    document.body.append(modalTimer);
  }

  // Возможные недоработки:
  // 1.Недоработка: После повторного спавна таймера он наслаивается на текущий таймер.
  // 2.Автоматизирование функции которая создает массив options для выбранного selecta путем создания отдельной функции, которая получает на вход имя массива options
}
