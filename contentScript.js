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

            thisUser = await getCurrentUserData(thisUser);
            userIdInput.value = thisUser.userEmail;
            userIdList = [matrixId, vasylVId, thisUser.userId];
            
            sidePanel.classList.remove('hidden');

        } else {
            sidePanel.classList.add('hidden');
        }
    }
});

const currentURL = window.location.href;
console.log('currentURL', currentURL);


const sidePanel = document.createElement('div');
sidePanel.className = 'side-panel hidden w-1/4 h-screen bg-gray-100 p-4 fixed right-0 top-0 z-50';
sidePanel.id = 'sidePanel';

const grid = document.createElement('div');
grid.className = 'grid grid-cols-2 gap-4';

const sidePanelGrid = sidePanel.appendChild(grid);

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

const label2 = document.createElement('label');
label2.htmlFor = 'msidList';
label2.innerText = 'MSID List';

const coll3 = document.createElement('div');
coll3.className = 'space-y-0.5';

const msidList = document.createElement('textarea');
msidList.id = 'msidList';
msidList.rows = '10';
msidList.placeholder = 'MSID List';
msidList.className = 'w-full p-2 border rounded mb-2';

const textElement = document.createElement('p');
textElement.className = "text-muted-foreground"
textElement.innerText = '   [...]  - parse / validate array'

coll3.appendChild(msidList);
coll3.appendChild(textElement);

coll2.appendChild(label2);
coll2.appendChild(coll3);

const coll4 = document.createElement('div');
coll3.className = 'space-y-0.5'; 

const sliderLabel = document.createElement('label');
sliderLabel.innerText = "Clonned site destination";

const slider = document.createElement('input');
slider.type = 'range';
slider.min = '0';
slider.max = '2';
slider.value = '2';
slider.addEventListener('change', (e) => {
    if (e.target.value == '0') {
        console.log("Selected: clone to your account");
    } else if (e.target.value == '1'){
        console.log("Selected: clone to test @vasylv");
    } else {
        console.log("Selected: clone to test matrix");
    }
});
coll4.appendChild(sliderLabel);
coll4.appendChild(slider);

coll2.appendChild(coll4);

const leftButton = document.createElement('button');
leftButton.innerText = "Test Matrix";
leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // начальный стиль (серый)

const middleButton = document.createElement('button');
middleButton.innerText = "Vasyl Velmyk";
middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // н

const rightButton = document.createElement('button');
rightButton.innerText = "My account";
rightButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2"; // начальный стиль (активный)

const buttonContainer = document.createElement('div');
buttonContainer.className = "flex justify-between mt-3"; // расположение кнопок слева и справа
buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(middleButton);
buttonContainer.appendChild(rightButton);

coll2.appendChild(buttonContainer);


slider.addEventListener('input', (e) => {
    targetOption = 'e.target.value ';
    if (e.target.value == '0') {
        leftButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
        middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
        rightButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль
    } else  if (e.target.value == '1') {
        leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2";
        middleButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";// неактивный стиль        // активный стиль        // неактивный стиль
        rightButton.className ="text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // активный стиль
    } else if (e.target.value == '2') {
        leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
        middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
        rightButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
    }
});

const msidListColl = coll2;

const executeBtn = document.createElement('button');
executeBtn.id = 'executeBtn';
executeBtn.className = 'p-2 bg-blue-500 text-white rounded';
executeBtn.innerText = 'Start cloning';

const messageDiv = document.createElement('div');
messageDiv.className = 'text center mb-2'
messageDiv.innerText = 'Plese open the user managment page';
messageDiv.addEventListener('click', () => {
    window.open('https://bo.wix.com/um/', '_blank');
});


if (currentURL.includes('https://bo.wix.com/')) {
sidePanelGrid.appendChild(labledInput);
sidePanelGrid.appendChild(msidListColl);
sidePanel.appendChild(executeBtn)
} else {
 sidePanelGrid.appendChild(messageDiv);
}

document.body.appendChild(sidePanel);

// Обработчик клика на кнопку
// executeBtn.addEventListener('click', () => {
//     sidePanel.classList.add('hidden');
//     // Тут можно добавить дополнительный код для обработки данных из полей ввода
// });

//const parsedMsidList = parseStringToArray(msidList.value);

leftButton.addEventListener('click', () => {
slider.value = '0'
leftButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
rightButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
});

middleButton.addEventListener('click', () => {
    slider.value = '1'
    leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2";
    middleButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";// неактивный стиль        // активный стиль        // неактивный стиль
    rightButton.className ="text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
});

rightButton.addEventListener('click', () => {
    slider.value = '2'
    leftButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; 
    middleButton.className = "text-gray-400 bg-transparent border border-gray-400 rounded px-4 py-2"; // неактивный стиль        // активный стиль
    rightButton.className = "text-blue-500 bg-transparent border border-blue-500 rounded px-4 py-2";
})

textElement.addEventListener('click', async () => {
    if (msidList.value.length > 0) {
    console.log('LIST: ', msidList.value);
    const parsedText = await parseStringToArray(msidList.value);
    console.log('Parsed: ', parsedText);
    msidList.value = await JSON.stringify(parsedText);
    }
})

executeBtn.addEventListener('click', async () => {
    if (thisUser.isWix) {
        const targetUserId = userIdList[targetOption];
        msidList2 = await parseStringToArray(msidList.value);

        executeBtn.disabled = true;

        for (const msid of msidList2) {
            await cloneSite(msid, targetUserId);
        }
        executeBtn.disabled = false;
    }
});





// XSRF-TOKEN
