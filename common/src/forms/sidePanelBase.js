import { createElement, appendChilds, nestedElements } from "../../src/etc/utils.js";
import { wrongLocationDefaultMessage } from "../components/baseElemnts";

export function hideForm (formToHide, viewsState)  {
    viewsState[formToHide.id] = 'hidden';
    formToHide.classList.add('hidden');
};

export function showForm (formToShow, formsToHide, viewsState) {
    if (formsToHide?.length > 0) {
        for (const formToHide of formsToHide) {
            formToHide.id != formToShow.id ? hideForm(formToHide, viewsState) : '';
         }
    }
    viewsState[formToShow.id] = 'showed';
    formToShow.classList.remove('hidden');    
};



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
    const inputForm = createElement('div', {id:"inputForm", class:'space-y-1 hidden'});
    const progressForm = createElement('div', {id:"progressForm", class:'space-y-1 hidden'});
    const panelMessageForm = createElement('div', {id:"panelMessageForm", class:'p-6 pt-0 pb-2 space-y-2 hidden'});
    const defaultMessage = wrongLocationDefaultMessage();
    panelMessageForm.appendChild(defaultMessage);

    return [inputForm, progressForm, panelMessageForm];
}

export const sidePanel = (viewsState) => {
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