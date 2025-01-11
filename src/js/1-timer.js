
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownInterval = null;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    const selectedDate = selectedDates[0];

    if (selectedDate <= now) {
      iziToast.error({
        title: "Invalid Date",
        message: "Please choose a date in the future",
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

function startTimer() {
  const now = new Date();
  if (userSelectedDate <= now) {
    return;
  }

  startBtn.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = userSelectedDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      datetimePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener('click', startTimer);


