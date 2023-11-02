import { getCurrentUserData } from './common/authAndCookies.js';
import { cloneSite } from './common/cloneSite.js';
import { parseStringToArray } from './common/utils.js';

const matrixId = 'b5d67212-f61e-47ac-b10d-7bd67bafbb6b';
const vasylVId = 'b712d86e-d9ec-4856-9518-898648f8c96d';

let thisUser = {
    userId: '',
    isWix: 'false',
    userEmail: ''
};

let msidList2 = [];
let userIdList =[];
let targetOption ='0'


chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
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
});

const currentURL = window.location.href;
console.log('currentURL', currentURL);


let sidePanel = document.createElement('div');
sidePanel.className = 'side-panel hidden w-1/4 h-screen bg-gray-100 p-4 fixed right-0 top-0 z-50';
sidePanel.id = 'sidePanel';

const sidePanelPreloader = document.createElement('div');
sidePanelPreloader.className = 'side-panel w-1/4 h-screen bg-gray-100 p-4 fixed right-0 top-0 z-50';
sidePanelPreloader.id = 'sidePanelPreloader';

const spinBox = document.createElement('div');
spinBox.className ='justify-center items-center';

const spinner = document.createElement('div');
spinner.className = 'loader';

spinBox.appendChild(spinner);
sidePanelPreloader.appendChild(spinBox);

const grid = document.createElement('div');
grid.className = 'grid grid-cols-2 gap-4';

let sidePanelGrid = sidePanel.appendChild(grid);
//let preloadGrid = sidePanelPreloader.appendChild(grid);


sidePanel.appendChild(sidePanelGrid);
sidePanelGrid.classList.add('hidden');

const coll = document.createElement('div');
coll.className = 'flex flex-col space-y-1.5"';

const label = document.createElement('label');
label.htmlFor = 'userIdInput';
label.innerText = 'Current User';

const userIdInput = document.createElement('input');
userIdInput.type = 'text';
userIdInput.id = 'userIdInput';
userIdInput.placeholder = 'Current user';
userIdInput.className = 'mb-2 p-2 border rounded';
userIdInput.disabled = true;


coll.appendChild(label);
coll.appendChild(userIdInput);

const labledInput = coll;

const coll2 = document.createElement('div');
coll2.className = 'flex flex-col space-y-1.5';


const singleColl = document.createElement('div');
singleColl.className = "relative rounded-xl overflow-auto p-8";

const singleCollDiv = document.createElement('div');
singleCollDiv.className = "max-w-xs mx-auto space-y-1";

const label2 = document.createElement('label');
label2.htmlFor = 'msidList';
label2.innerText = 'MSID List';

const msidList = document.createElement('textarea');
msidList.id = 'msidList';
msidList.rows = '10';
msidList.placeholder = 'MSID List';
msidList.className = 'w-full p-2 border rounded mb-2';

const textElement = document.createElement('span');
userIdInput.type = 'text';
textElement.className = 'text p-2 border 2 border-dark-200/100 border-b-dark-200/100  px-4 py-2'
textElement.innerText = ' [...] validate array'
textElement.htmlFor = 'msidList';



const lbl = document.createElement('label');
lbl.htmlFor = 'msidList';
lbl.appendChild(label2);
lbl.appendChild(msidList);
lbl.appendChild(textElement);

singleCollDiv.appendChild(lbl);
singleColl.appendChild(singleCollDiv)
coll2.appendChild(singleColl);

const slider = document.createElement('input');
slider.id = 'slider';
slider.type = 'range';
slider.min = '0';
slider.max = '2';
slider.step = '1';
slider.value = '2';
slider.title = "Clonned site destination";

const sliderLabel = document.createElement('label');
sliderLabel.htmlFor = 'slider';
sliderLabel.id = 'sliderLabel';

const notSelecteOption = 'text-dark-400/200 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border 2 border-dark-200/100 border-b-dark-200/100  px-4 py-2';
const selectedOption = 'text-blue-500 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border 2 border-sky-400 border-b-sky-400 px-4 py-2';

const leftButton = document.createElement('button');
leftButton.innerText = "Test Matrix";
leftButton.className = notSelecteOption;
leftButton.id = 'leftButton';
leftButton.targetOpyion = '0';

const middleButton = document.createElement('button');
middleButton.innerText = "Vasyl Velmyk";
middleButton.className = notSelecteOption;
middleButton.id = 'middleButton';
middleButton.targetOpyion = '1';

const rightButton = document.createElement('button');
rightButton.innerText = "My account";
rightButton.className = selectedOption;
rightButton.id = 'rightButton';
rightButton.targetOpyion = '2';


const buttonContainer = document.createElement('div');
buttonContainer.className = "flex justify-between mt-3"; 
buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(middleButton);
buttonContainer.appendChild(rightButton);

sliderLabel.appendChild(slider);
sliderLabel.appendChild(buttonContainer);


coll2.appendChild(sliderLabel);

const updateButtons = (targetOption) => {
    buttonContainer.childNodes.forEach((button) => {
        button.targetOpyion == targetOption ? button.className =  selectedOption : button.className = notSelecteOption;
    })
}

slider.addEventListener('input', () => {
    targetOption = 'e.target.value ';
    updateButtons(targetOption);
});

buttonContainer.childNodes.forEach((button) => {
    button.addEventListener('click', () => {
        targetOption = button.targetOpyion;
        slider.value = targetOption
        updateButtons(targetOption);
    });
})

const msidListColl = coll2;

const executeBtn = document.createElement('button');
executeBtn.id = 'executeBtn';
executeBtn.className = 'p-2 bg-blue-500 text-white rounded';
executeBtn.innerText = 'Start cloning';

const messageDiv = document.createElement('div');
messageDiv.className = 'text center mb-2 hidden'
messageDiv.innerText = 'Plese open the user managment page';
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




 const spinner2 = document.createElement('div');
 spinner2.className = 'loader';
 spinner2.id = 'spinner2';

//ocument.body.appendChild(sidePanel);

textElement.addEventListener('click', async () => {
    if (msidList.value.length > 0) {
    console.log('LIST: ', msidList.value);
    const parsedText = await parseStringToArray(msidList.value);
    console.log('Parsed: ', parsedText);
    msidList.value = await JSON.stringify(parsedText);S
    }
})



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
