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


const divSect =  () =>  {
    const html = `<div class="side-panel w-1/4 h-screen bg-gray-100 p-4 fixed right-0 top-0 z-50" id="sidePanel" data-aria-hidden="true" aria-hidden="true"><div class="grid grid-cols-2 gap-4"><div class="flex flex-col space-y-1.5&quot;"><label for="userIdInput">Current User</label><input type="text" id="userIdInput" placeholder="Current user" class="mb-2 p-2 border rounded" disabled=""></div><div class="flex flex-col space-y-1.5"><label for="msidList">MSID List</label><div class="space-y-0.5"><textarea id="msidList" rows="10" placeholder="MSID List" class="w-full p-2 border rounded mb-2"></textarea><p class="text-muted-foreground">   [...]  - parse / validate array</p></div><div><label>Clonned site destination</label><input type="range" min="0" max="2"></div><div class="flex justify-between mt-3"><button class="text-dark-400/200 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border-t border-dark-200/100rounded px-4 py-2" id="leftButton">Test Matrix</button><button class="text-dark-400/200 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border-t border-dark-200/100rounded px-4 py-2" id="middleButton">Vasyl Velmyk</button><button class="text-blue-500 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border-b border-sky-400 rounded px-4 py-2" id="rightButton">My account</button></div></div><button id="executeBtn" class="p-2 bg-blue-500 text-white rounded">Start cloning</button><div class="text center mb-2">Plese open the user managment page</div></div><div><div class="relative rounded-xl overflow-auto p-8"><div class="max-w-xs mx-auto space-y-1">
    <label>
      <span class="text-slate-900 dark:text-slate-200 text-sm font-medium">Email address</span>
      <input type="text" placeholder="jane@example.com" class="font-sans block text-sm leading-5 w-full py-2 px-3 border-2 border-rose-600 text-slate-500 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-rose-200 focus:border-rose-500 dark:text-slate-400 dark:placeholder:text-slate-600 dark:bg-slate-900 dark:border-rose-500 dark:focus:ring-rose-900 dark:focus:border-rose-600">
    </label>
    <span class="text-rose-600 dark:text-rose-500 text-sm">This field is required.</span>
  </div>
  </div></div></div>`
    const divEl = document.createElement('div');
    divEl.insertAdjacentHTML('afterbegin', html)
    return divEl
};

sidePanel.appendChild(divSect());

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
textElement.htmlFor = 'msidList';



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

const notSelecteOption = 'text-dark-400/200 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border-t border-dark-200/100rounded px-4 py-2';
const selectedOption = 'text-blue-500 items-center justify-center whitespace-nowrap text-sm font-medium transition-colors border-b border-sky-400 rounded px-4 py-2';

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
rightButton.className = selectedOption;// начальный стиль (активный)
rightButton.id = 'rightButton';
rightButton.targetOpyion = '2';


const buttonContainer = document.createElement('div');
buttonContainer.className = "flex justify-between mt-3"; // расположение кнопок слева и справа
buttonContainer.appendChild(leftButton);
buttonContainer.appendChild(middleButton);
buttonContainer.appendChild(rightButton);

coll2.appendChild(buttonContainer);


slider.addEventListener('input', (e) => {
    targetOption = 'e.target.value ';
    buttonContainer.childNodes.forEach((button) => {
        button.className = button.targetOpyion == e.target.value ? selectedOption : notSelecteOption;
    })
});

buttonContainer.childNodes.forEach((button) => {
    button.addEventListener('click', (e) => {
        slider.value = e.target.targetOpyion;
    });
})

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


//if (currentURL.includes('https://bo.wix.com/')) {
sidePanelGrid.appendChild(labledInput);
sidePanelGrid.appendChild(msidListColl);
sidePanelGrid.appendChild(executeBtn)
//} else {
 sidePanelGrid.appendChild(messageDiv);
//}

document.body.appendChild(sidePanel);

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
