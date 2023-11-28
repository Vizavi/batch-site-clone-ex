import { label, textButton, tabButton, buttonStateClasses, collapsedElementTitleWithIcon } from "./baseElemnts";

import { setAttributeIfItHasValue } from "./utils";

let nestedElenebtsList = [];

let viewStates= {
    sidePanel: 'hidden',
    inpputGroup: 'hidden',
    progressGroup: 'hidden',
    inPanelMessage: 'hidden',
}; 

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

export function createElement(tag, options) {
    const element = document.createElement(tag);
    Object.keys(options).forEach(key => {
        if (key === 'innerText') {
            element.innerText = options[key];
        } else {
            element.setAttribute(key, options[key]);
        }
    });
    return element;
}

function appendChilds(parent, ...childs) {
    childs.forEach(child => parent.appendChild(child));
    return parent;
}



function nestedElements(...elementsList) {
    let reversIndex = elementsList.length -1 
    const lastElement = elementsList[reversIndex]

    for (const chield of  elementsList) {
       const lastChield = elementsList[reversIndex];
       const lastParent = elementsList[reversIndex-1];

       lastParent.appendChild(lastChield)
       reversIndex = reversIndex-1;

       if (reversIndex == 0)
       return {
        htmlElement:lastParent,
        nestedHtmlElement:lastElement
       }
    }
}

function groupAndAlignElements (...childs) {
    const parent = createElement('div', {class: 'space-y-1'});
    const parent2= createElement('div', {class: 'p-6 pt-0 pb-2 space-y-2'});
    const lineSpacing = appendChilds(parent, ...childs);
    const group =  appendChilds(parent2, lineSpacing);
    return group;
}

export const paragraph = (text) => {
    return createElement('p', {class:'p-2 text-sm font-normal bg-gray-50 text-neutral-500', innerText: text});
}



// function groupAndAlignElements (paddings = {},...childs) {
//     const defaultPaddings = {padding:'p-6', paddingTop:'pt-0', paddingBottom:'pb-2'}
//     const resultedPaddings = {...defaultPaddings, ...paddings};
//     const parent = createElement('div', {class: 'space-y-1'});
//     const parent2= createElement('div', {class: `${resultedPaddings.padding} ${resultedPaddings.paddingTop} ${resultedPaddings.paddingBottom} space-y-2`});
//     const lineSpacing = appendChilds(parent, ...childs);
//     const groupSpacing =  appendChilds(parent2, lineSpacing);
//     return groupSpacing;
// }

function inputGroupWithLabel (id, labelText, inputElement,  inputDisabled = false)  {
    const labelElement = label(id, labelText);
    inputDisabled ? inputElement.setAttribute('disabled', '') : '';
    const group = groupAndAlignElements(labelElement, inputElement);
    return group;  
}

function inputGroupWithLabelAndUnderButtons (id, labelText, inputElement,  inputDisabled = false, buttons)  {
    const labelElement = label(id, labelText);
    inputDisabled ? inputElement.setAttribute('disabled', '') : '';
    const group = groupAndAlignElements(labelElement, inputElement, buttons);
    return {
        htmlElement:group,
        msidInput:inputElement
    }
}

export function labledTextArea (id, labelText, placeholder, value = '',  inputDisabled = false, buttons)  {
    const inputElement = createElement('textarea', {id:id, rows:10, placeholder: placeholder, class:'w-full p-2 border rounded mb-2'});
    return inputGroupWithLabelAndUnderButtons(id, labelText, inputElement, inputDisabled, buttons);
}

export function labledTextInput (id, labelText, placeholder = '', value = '',  inputDisabled = false)  {
    console.log('Labled text inputL ', id, labelText, placeholder, value,  inputDisabled);
    const inputElement = createElement('input', {type:'text', id:id, placeholder: placeholder, class: 'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50', value: value});
    return inputGroupWithLabel(id, labelText, inputElement, inputDisabled);
}

export function getButtonGroup() {
    const group = createElement('div', { class:'flex items-center justify-end gap-2 py-0'});
    const clearButton =  textButton ('clearButton', 'Clear');
    const validateButton =  textButton ('validateButton', '{...}')
    return appendChilds(group, clearButton, validateButton);
}

const sidePanelBody = () => {
    const sidePanel = createElement('div', { class: 'hidden side-panel top-0 right-0 z-50 w-1/5 h-screen bg-gray-100 p-4 fixed', id: 'sidePanel' });
    let elemnts = [];
    elemnts.push(createElement('div', { class: 'grid grid-cols-1 gap-2', id: 'grid' }));
    elemnts.push(createElement('div', { class: 'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border bg-white', id:'side-panel-content-preview', tabindex:'0', style:"animation-duration: 0s;" }));
    elemnts.push(createElement('div', { class: 'theme-zinc w-full', style:'--radius: 0.5rem;'}));
    elemnts.push(createElement('div', { class: 'preview flex w-full justify-center p-2 items-center' }));
    elemnts.push(createElement('div', { dir: 'ltr', class: 'w-[400px]' }));
    elemnts.push(createElement('div', {class:'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', id:'content-group', tabindex:'0', style:"animation-duration: 0s;"}));
    elemnts.push(createElement('div', {class:'rounded-md border bg-card text-card-foreground shadow'}));

    return [sidePanel, elemnts];
}

const sidePanelViewes = () => {
    const inputGroup = createElement('div', {id:"inputGroup", class:'space-y-1 hidden'});
    const progressGroup = createElement('div', {id:"progressGroup", class:'space-y-1 hidden'});
    const inPanelMessage = createElement('div', {id:"inPanelMessage", class:'p-6 pt-0 pb-2 space-y-2 hidden'});
    inPanelMessage.appendChild(locationDiv);

    return [inputGroup, progressGroup, inPanelMessage];
}

function hideForm (formToHide, viewsState = viewStates)  {
    viewsState[formToHide.id] = 'hidden';
    formToHide.classList.add('hidden');
};

function showForm (formToShow, formsToHide, viewsState = viewStates) {
    if (formsToHide.length > 0) {
        for (const formToHide of formsToHide) {
            formToHide.id != formToShow.id ? hideForm(formToHide) : '';
         }
    }

    viewsState[formToShow.id] = 'showed';
    formToShow.classList.remove('hidden');
}

export function getSidePanel(viewsState = viewStates) {
    const [sidePanel, elementsList] = sidePanelBody();
    const [inputForm, progressForm, panelMessageForm] = sidePanelViewes();
    const formsList = [inputForm, progressForm, panelMessageForm];


    const fromsDiv = createElement('div', {class:'mt-2', id:'froms'});
    const formsContainer = appendChilds(fromsDiv, inputForm, progressForm, panelMessageForm);
    const sidePanelElements = nestedElements(...[sidePanel, ...elementsList, formsContainer]);
    const fullPanel = {...sidePanelElements, viewsState, inputForm, progressForm, panelMessageForm}


    const hide = {
        sidePanel: ()=>hideForm(sidePanel,viewsState),
        inputForm: ()=> hideForm(inputForm, viewsState),
        progressForm: ()=> hideForm(progressForm, viewsState),
        panelMessageForm: ()=> hideForm(panelMessageForm, viewsState),
    }; 
    const show = {
        sidePanel: ()=> showForm(sidePanel, formsList, viewsState),
        inputForm: ()=>showForm(inputForm, formsList, viewsState),
        progressForm: ()=>showForm(progressForm, formsList, viewsState),
        panelMessageForm: ()=>showForm(panelMessageForm, formsList, viewsState),
    };
     return {htmlElement:sidePanel, nestedHtmlElement:formsContainer, hide, show, fullPanel};
}

export function getTabPanel() {
    const tablist = createElement('div',{ role:'tablist', id:'tablist', class:'h-9 items-center justify-center rounded-lg bg-muted bg-gray-100 p-1 text-muted-foreground grid w-full grid-cols-2', tabindex:'0', style:'outline: none;'});
    const labelElement = label('tablist', 'Target account' );
    const leftTabButton =  tabButton('leftTabButton', 'Test Matrix', 'active', 'remoteUser', 0);
    const rightTabButton = tabButton('rightTabButton', 'Current User', 'inactive', 'thisUser', -1);
    const tabGroup = appendChilds(tablist, leftTabButton, rightTabButton);
    const tabPanel = groupAndAlignElements(labelElement,tabGroup);
    return tabPanel
}


export const newButton =  ( buttonId ='newButton', buttonText = 'Button label is missed', href = '', isDisabled = false) => {
    const classStates = buttonStateClasses();
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