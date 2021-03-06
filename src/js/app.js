import '../css/main.scss';

import {Calendar} from './calendar.js';

const container = document.querySelector('.calendar');
const calendar = new Calendar(container);

import {Slider} from './slider.js';

const sliderParent = document.getElementsByClassName('slider')[0];
const slider = new Slider(sliderParent);

import {Supporter} from './supporter.js';

const supporterSection = document.getElementsByClassName('supporters-grid')[0];
const supp = new Supporter(supporterSection);