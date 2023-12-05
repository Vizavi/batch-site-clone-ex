import { label, textButton, tabButton, buttonStateClasses, collapsedElementTitleWithIcon } from "./baseElemnts.js";

import { setAttributeIfItHasValue, nestedElements, createElement, appendChilds,groupAndAlignElements, paragraph } from "../etc/utils.js";

const incorrectLocationbPanel = `<div class="border-t-2 border-neutral-100 p4 dark:border-neutral-500">
<p class="flex items-center justify-center text-neutral-500 dark:text-neutral-300">
  <span class="ml-2">
    To use this extension, plese
    \n navigate to the <a href="https://bo.wix.com" target="_blank" class="text-sky-500 hover:text-sky-600">bo.wix.com</a> page
    \n (VPN should be connected)
  </span> 
</p>
</div>`;

const locationDiv = document.createElement('div');
locationDiv.insertAdjacentHTML('afterbegin', incorrectLocationbPanel);


const inputProperties = (inputElement, htmlElement, inputDisabled, onChangeCallback=()=>{console.log('callback')}) => {
    inputDisabled ? inputElement.setAttribute('disabled', '') : '';

    inputElement.addEventListener('input', () => {
        onChangeCallback();
    });

    return{
        htmlElement:htmlElement,
        inputElement:inputElement,
        setValue: (newValue) => {
            inputElement.value = newValue;
            onChangeCallback();
        },
        getValue: () => inputElement.value,
    }
}

function inputGroupWithLabel (id, labelText, inputElement,  inputDisabled = false, onChangeCallback)  {
    const labelElement = label(id, labelText);
    const group = groupAndAlignElements(labelElement, inputElement);
    return  inputProperties(inputElement, group, inputDisabled, onChangeCallback);
}


function inputGroupWithLabelAndUnderButtons (id, labelText, inputElement,  inputDisabled = false, buttons,  onChangeCallback)  {
    const labelElement = label(id, labelText);
    const group = groupAndAlignElements(labelElement, inputElement, buttons);
    return inputProperties(inputElement, group, inputDisabled, onChangeCallback);
}

export function labledTextArea (id, labelText, placeholder, value = '',  inputDisabled = false, buttons, onChangeCallback)  {
    const inputElement = createElement('textarea', {id:id, rows:10, placeholder: placeholder, class:'w-full p-2 border rounded mb-2'});
    return inputGroupWithLabelAndUnderButtons(id, labelText, inputElement, inputDisabled, buttons, onChangeCallback);
}

export function labledTextInput (id, labelText, placeholder = '', value = '',  inputDisabled = false, onChangeCallback)  {
    console.log('Labled text inputL ', id, labelText, placeholder, value,  inputDisabled);
    const inputElement = createElement('input', {type:'text', id:id, placeholder: placeholder, class: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', value: value});
    return inputGroupWithLabel(id, labelText, inputElement, inputDisabled, onChangeCallback);
}

export function getButtonGroup() {
    const group = createElement('div', { class:'flex items-center justify-end gap-2 py-0'});
    const clearButton =  textButton ('clearButton', 'Clear');
    const validateButton =  textButton ('validateButton', '{...}')
    return appendChilds(group, clearButton, validateButton);
}

export function getTabPanel() {
    const tablist = createElement('div',{ role:'tablist', id:'tablist', class:'h-9 items-center justify-center rounded-lg bg-muted bg-gray-100 p-1 text-muted-foreground grid w-full grid-cols-2', tabindex:'0', style:'outline: none;'});
    const labelElement = label('tablist', 'Target account' );
    const leftTabButton =  tabButton('leftTabButton', 'Test Matrix', 'inactive', 'remoteUser', 0);
    const rightTabButton = tabButton('rightTabButton', 'Current User', 'active', 'thisUser', -1);
    const tabGroup = appendChilds(tablist, leftTabButton, rightTabButton);
    const tabPanel = groupAndAlignElements(labelElement,tabGroup);
    return tabPanel
}


export const newButton =  ( buttonId ='newButton', buttonText = 'Button label is missed', href = '', isDisabled = false) => {
    const classStates = buttonStateClasses(buttonId);
    const buttonElement =  createElement('a', {role:"button", id:`${buttonId}`, innerText:`${buttonText}`});
    setAttributeIfItHasValue(buttonElement, 'href', href);

    const gridElement = createElement('div', {class:'items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-1'});
    gridElement.appendChild(buttonElement);
    const gridWithButton = groupAndAlignElements(gridElement);

    const disable = () => {
        buttonElement.setAttribute('class', classStates['disabled']);
        buttonElement.setAttribute('disabled', '');
    }; 
    const enable = () => {
        buttonElement.setAttribute('class', classStates['enabled']);
        buttonElement.removeAttribute('disabled');
    };
    
    isDisabled ? disable() : enable();

    return {htmlElement:gridWithButton, disable, enable};
}

export function spoileredElement(labelText = 'Label is not defined', hiddenElement = locationDiv) {
    const summary = collapsedElementTitleWithIcon(labelText);
    const div = createElement('div', {class:"p-6 pt-0 space-y-2"});
    const datails = createElement('details', {class:"group [&_summary::-webkit-details-marker]:hidden"});
    datails.insertAdjacentHTML('beforeend', summary);
    datails.appendChild(hiddenElement);
    div.appendChild(datails);
    return div;
}