import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.start.disabled = true;
const CHOOSE_DAY = new Date();
let SELECT_DAY = new Date();
let difference = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < CHOOSE_DAY) {
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      refs.start.disabled = true;
    } else {
      refs.start.disabled = false;
      SELECT_DAY = selectedDates[0];
    }
  },
};
flatpickr(refs.input, options);
require('flatpickr/dist/themes/dark.css');

refs.start.addEventListener('click', onStartClick);

function onStartClick() {
  refs.start.disabled = true;
  refs.input.disabled = true;
  timerID = setInterval(() => {
    difference = SELECT_DAY - Date.now();
    let rounding = convertMs(difference);
    if (difference <= 0) {
      clearInterval(timerId);
    } else {
      addLeadingZero(rounding);
    }
  }, 1000);
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
function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = days.toString().padStart(2, 0);
  refs.hours.textContent = hours.toString().padStart(2, 0);
  refs.minutes.textContent = minutes.toString().padStart(2, 0);
  refs.seconds.textContent = seconds.toString().padStart(2, 0);
}
