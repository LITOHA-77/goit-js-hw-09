const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.start.addEventListener('click', fonChangeStart);
refs.stop.addEventListener('click', fonChangeStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onFonChange() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function fonChangeStart() {
  id = setInterval(() => {
    onFonChange();
  }, 1000);
  refs.start.disabled = true;
}

function fonChangeStop() {
  clearInterval(id);
  refs.start.disabled = false;
}
