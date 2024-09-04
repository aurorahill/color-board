import './sass/index.scss';

const box = document.querySelector('.box');
const speedButtons = document.querySelectorAll('[data-setting="speed"]');
const colorButtons = document.querySelectorAll('[data-setting="color"]');
const slider = document.querySelector('#slider');
const sliderInfo = document.querySelector('.slider-info');
const footer = document.querySelector('.footer');

const squares = 2000;
let sliderValue = 70;
let range = 360;
let transitionSpeed = '3s'; // Domyślna prędkość

const createSquares = () => {
  box.innerHTML = '';
  for (let i = 0; i < squares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    // Kolorowanie zawsze natychmiastowe
    square.style.transitionDuration = '0s';
    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseout', () => removeColor(square));

    // Obsługa dotyku
    square.addEventListener('touchstart', () => {
      createSquares();

      setColor(square);
    });
    square.addEventListener('touchmove', handleTouchMove);

    box.appendChild(square);
  }
};

const setColor = (square) => {
  let h;

  if (range === 360) {
    h = Math.floor(Math.random() * 360);
  } else {
    h = Math.floor(Math.random() * 60) + range;
  }

  const s = slider.value + '%';
  const l = '50%';

  square.style.backgroundColor = `hsl(${h},${s},${l})`;
};

const removeColor = (square) => {
  square.style.transitionDuration = transitionSpeed;
  square.style.backgroundColor = 'transparent';
};

function handleSpeed() {
  transitionSpeed = this.dataset.speed + 's';
}

function handleColorRange() {
  range = parseInt(this.dataset.colorRange);
}

const showSliderValue = () => {
  sliderValue = slider.value;
  sliderInfo.textContent = slider.value;
};

const handleTouchMove = (event) => {
  event.preventDefault();

  const touch = event.touches[0];
  const element = document.elementFromPoint(touch.clientX, touch.clientY);

  if (element && element.classList.contains('square')) {
    setColor(element);

    // Ustawienie opóźnionego zanikania koloru po krótkim czasie
    setTimeout(() => {
      removeColor(element);
    }, 50); // Czas opóźnienia można dostosować w milisekundach
  }
};

speedButtons.forEach((btn) => btn.addEventListener('click', handleSpeed));
colorButtons.forEach((btn) => btn.addEventListener('click', handleColorRange));
slider.addEventListener('mousemove', showSliderValue);
slider.addEventListener('touchmove', showSliderValue);

createSquares();

const handleFooterHeight = () => {
  const squareHeight = 0.03 * innerHeight + 6;
  const boxHeight =
    (Math.floor((innerHeight - box.offsetTop) / squareHeight) - 1) *
    squareHeight;
  const footerHeight = innerHeight - box.offsetTop - boxHeight + 1;
  footer.style.height = footerHeight + 'px';
};

handleFooterHeight();

window.addEventListener('resize', handleFooterHeight);
