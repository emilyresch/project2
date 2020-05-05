window.mdc.autoInit();

import {MDCSwitch} from '@material/switch';
import {MDCTextField} from '@material/textfield';

const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'));
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));

import {MDCTopAppBar} from '@material/top-app-bar';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
// $(".mdc-switch").on("click", function(e) {
//     e.preventDefault();

// });