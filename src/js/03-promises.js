import { Notify } from 'notiflix';

const STORAGE_KEY = 'input';

const formData = {};

const refs = {
  form: document.querySelector('form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
};

refs.form.addEventListener('submit', onFormsSubmit);
refs.form.addEventListener('input', onFormsInput);

function onFormsInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormsSubmit(e) {
  const parsObject = JSON.parse(localStorage.getItem(STORAGE_KEY));
  e.preventDefault();
  e.currentTarget.reset();

  let delay = Number(parsObject.delay);
  let step = Number(parsObject.step);
  const amount = Number(parsObject.amount);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay);
    delay += step;
  }
  localStorage.removeItem(STORAGE_KEY);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })

    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

fillInFields();

function fillInFields() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  const obj = JSON.parse(saveMessage) || {};

  if (obj?.delay) {
    refs.inputDelay.value = obj.delay;
  }
  if (obj?.step) {
    refs.inputStep.value = obj.step;
  }
  if (obj?.amount) {
    refs.inputAmount.value = obj.amount;
  }
}
