document.addEventListener('DOMContentLoaded', function() { /* ... */ }) 

import { getCurrentUserData } from './common/authAndCookies.js';
import { cloneSite } from './common/cloneSite.js';
import { parseStringToArray } from './common/utils.js';

const matrixId = 'b5d67212-f61e-47ac-b10d-7bd67bafbb6b';
const vasylVId = 'b712d86e-d9ec-4856-9518-898648f8c96d';

function initializeUser() {
    return {
        userId: '',
        isWix: false, // Use boolean instead of string for boolean values
        userEmail: ''
    };
}

let thisUser = initializeUser();


let msidList2 = [];
let userIdList =[];
let targetOption ='0'

chrome.runtime.onMessage.addListener(handleMessage);

function createElement(tag, options) {
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


const currentURL = window.location.href;
console.log('currentURL', currentURL);

const sidePanel = createElement('div', { className: 'side-panel hidden w-1/4 h-screen bg-gray-100 p-4 fixed right-0 top-0 z-50', id: 'sidePanel' });

function handleSliderInput(event) {
    thisUser.targetOption = event.target.value;
    updateButtons(thisUser.targetOption);
}

function handleButtonClick(event) {
    const button = event.target;
    thisUser.targetOption = button.getAttribute('data-target-option');
    document.getElementById('slider').value = thisUser.targetOption;
    updateButtons(thisUser.targetOption);
}

// Attach event listeners
document.getElementById('slider').addEventListener('input', handleSliderInput);
// Assuming buttons have a common class 'option-button'
document.querySelectorAll('.option-button').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


function updateButtons(selectedOption) {
    document.querySelectorAll('.option-button').forEach(button => {
        const option = button.getAttribute('data-target-option');
        button.className = option === selectedOption ? selectedOptionClass : notSelectedOptionClass;
    });
}

async function handleExecuteClick() {
    if (thisUser.isWix) {
        // ... existing code ...
    }
}

document.getElementById('executeBtn').addEventListener('click', handleExecuteClick);


const grid = createElement('div', { className: 'grid grid-cols-2 gap-4', id: 'grid' });


const sidePanelGrid = sidePanel.appendChild(grid, {});
//let preloadGrid = sidePanelPreloader.appendChild(grid);

function handleMessage(message, sender, sendResponse) {
    console.log("Received message from background script", message); 
    if (message.action === "toggleSidePanel") {
        if (sidePanel.classList.contains('hidden')) {

          //  thisUser = await getCurrentUserData(thisUser);
        //    userIdInput.value = thisUser.userEmail;
        //    userIdList = [matrixId, vasylVId, thisUser.userId];
            sidePanel.classList.remove('hidden');
        } else {

            sidePanel.classList.add('hidden');
            
        }
    }
};

sidePanel.appendChild(sidePanelGrid);
sidePanelGrid.classList.add('hidden');

const coll = createElement('div', {className: 'flex flex-col space-y-1.5'});

const label = createElement('label', {htmlFor: 'userIdInput', innerText: 'Current User' });

const userIdInput = createElement('input', {type:"text", id:"userIdInput", placeholder: 'Current user', className: "mb-2 p-2 border rounded", disabled: "true"});

coll.appendChild(label);
coll.appendChild(userIdInput);

const coll2 = createElement('div', {className: 'flex flex-col space-y-1.5'});

const singleColl = createElement('div',{userId:'relative rounded-xl overflow-auto p-8'});
singleColl.className = "relative rounded-xl overflow-auto p-8";

const singleCollDiv = createElement('div', "claclassNamessName:", 'max-w-xs mx-auto space-y-1');

const label2 = createElement('label', {htmlFor: 'msidList', innerText: 'MSID List'});

const msidList = createElement('textarea', {id:msidList, rows:10, placeholder: 'MSID List', className:'w-full p-2 border rounded mb-2'});

const textElement = createElement('span', {type:'text', className: `text p-2 border 2 border-dark-200/100 border-b-dark-200/100  px-4 py-2`, innerText: '[...]validate array', htmlFor: 'msidList'});

const lbl = createElement('label', {msid: "", id:"slider", type:"range", min:"0", max:"2", step:"1", value:"2", title: "Clonned site destination"});
const msidNew = createElement('label', {htmlFor: 'slider', id: 'sliderLabel'});

singleCollDiv.appendChild(lbl);
singleColl.appendChild(singleCollDiv)
coll2.appendChild(singleColl);

const slider = createElement('input', {id:'slider', type: 'range', min:'0', max:'2', step: '1', value: '2', title: "Clonned site destination"});

const sliderLabel = createElement('label', {htmlFor: 'slider', id: 'sliderLabel'});

const notSelecteOption = 'text-dark-400/200 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border 2 border-dark-200/100 border-b-dark-200/100  px-4 py-2';
const selectedOption = 'text-blue-500 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border 2 border-sky-400 border-b-sky-400 px-4 py-2';

const leftButton = createElement('button', {innerText: 'Test Matrix', className: notSelecteOption, id: 'leftButton', targetOpyion: '0'});

const middleButton = document.createElement('button', {innerText: 'Vasyl Velmyk', className: notSelecteOption, id: 'middleButton', targetOpyion: '1'});

const rightButton = document.createElement('button', {innerText:"My account",className: selectedOption, id: 'rightButton', targetOpyion: '2'});

const buttonContainer = document.createElement('div', {className: "flex justify-between mt-3"});
buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(middleButton);
buttonContainer.appendChild(rightButton);

sliderLabel.appendChild(slider);
sliderLabel.appendChild(buttonContainer);


coll2.appendChild(sliderLabel);

const msidListColl = coll2;

const executeBtn = createElement('button', {id: 'executeBtn', className: 'p-2 bg-blue-500 text-white rounded', innerText: 'Start cloning'});

const spinner2 = createElement('div', {className: 'loader', id: 'spinner2'});

const messageDiv = document.createElement('div', {id: 'messageDiv'});
messageDiv.addEventListener('click', () => {
    window.open('https://bo.wix.com/um/', '_blank');
});


//if (currentURL.includes('https://bo.wix.com/')) {
    //messageDiv.classList.add('hidden');
sidePanelGrid.appendChild(labledInput);
sidePanelGrid.appendChild(msidListColl);
sidePanelGrid.appendChild(executeBtn);
//} else {
   // messageDiv.classList.remove('hidden');
 sidePanelGrid.appendChild(messageDiv);
//}


// Обработчик клика на кнопку
// executeBtn.addEventListener('click', () => {
//     sidePanel.classList.add('hidden');
//     // Тут можно добавить дополнительный код для обработки данных из полей ввода
// });

//const parsedMsidList = parseStringToArray(msidList.value);

// leftButton.addEventListener('click', () => {
// slider.value = '0'
// leftButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
// middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
// rightButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
// });

// middleButton.addEventListener('click', () => {
//     slider.value = '1'
//     leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2";
//     middleButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";// неактивный стиль        // активный стиль        // неактивный стиль
//     rightButton.className ="text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
// });

// rightButton.addEventListener('click', () => {
//     slider.value = '2'
//     leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
//     middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
//     rightButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
// })

slider.addEventListener('input', handleSliderInput);

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('option-button')) {
        handleButtonClick(event);
    }
});


//ocument.body.appendChild(sidePanel);
document.addEventListener('click', function(event) {
    if (event.target.id === 'executeBtn') {
        handleExecuteClick();
    }
});

executeBtn.addEventListener('click', async () => {
    if (thisUser.isWix) {
        const targetUserId = userIdList[targetOption];
        msidList2 = await parseStringToArray(msidList.value);
        executeBtn.disabled = true;

        grid.classList.add('hidden');
        sidePanelGrid.appendChild(spinner2);


       // sidePanelPreloader.classList.remove('hidden');
        //sidePanelPreloader.classList.remove('hidden');
        for (const msid of msidList2) {
            await cloneSite(msid, targetUserId);
        }
        executeBtn.disabled = false;
    }
});





// XSRF-TOKEN
