import '../css/main.scss';

import {Calendar} from './calendar.js';

const container = document.querySelector('.calendar');
const calendar = new Calendar(container);

import {Slider} from './slider.js';

const sliderParent = document.getElementById('slider');
const slider = new Slider(sliderParent);