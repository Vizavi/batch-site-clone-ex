import { getCurrentUserData } from './common/authAndCookies.js';
import { cloneSite } from './common/cloneSite.js';
import { parseStringToArray } from './common/utils.js';

let thisUser = {
    userId: '7777777777777',
    isWix: 'true',
    userEmail: 'OLOLOLO@wix.com'
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("Received message from background script", message); 
    if (message.action === "toggleSidePanel") {
        if (sidePanel.classList.contains('hidden')) {

          //  thisUser = await getCurrentUserData(thisUser);
         //   userIdInput.value = thisUser.userEmail;
            sidePanel.classList.remove('hidden');

        } else {
            sidePanel.classList.add('hidden');
        }
    }
});


const msidList2 = [
    '83b32348-e7c2-4a29-b1b0-a753b75f51e2',
    '5ed11ed4-62fb-4438-9dd6-f12b58db1ead',
    '645265a3-a171-47c6-a00e-76c00fb24592',
];

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
coll2.appendChild(textElement);

coll2.appendChild(label2);
coll2.appendChild(coll3);


const msidListColl = coll2;

const executeBtn = document.createElement('button');
executeBtn.id = 'executeBtn';
executeBtn.className = 'p-2 bg-blue-500 text-white rounded';
executeBtn.innerText = 'Execute';

const messageDiv = document.createElement('div');
messageDiv.className = 'text center mb-2'
messageDiv.innerText = 'Plese open the user managmebt page';
messageDiv.addEventListener('click', () => {
    window.open('https://bo.wix.com/user-manager', '_blank');
});

// Добавляем элементы в боковую панель и затем панель вставляем в body

//if (currentURL.includes('https://bo.wix.com/user-manager')) {
sidePanelGrid.appendChild(labledInput);
sidePanelGrid.appendChild(msidListColl);
//} else {
// sidePanelGrid.appendChild(messageDiv);
sidePanel.appendChild(executeBtn)
//}

document.body.appendChild(sidePanel);

// Обработчик клика на кнопку
// executeBtn.addEventListener('click', () => {
//     sidePanel.classList.add('hidden');
//     // Тут можно добавить дополнительный код для обработки данных из полей ввода
// });

//const parsedMsidList = parseStringToArray(msidList.value);

textElement.addEventListener('click', async () => {
    console.log('LIST: ', msidList.value);
    const parsedText = await parseStringToArray(msidList.value);
    console.log('Parsed: ', parsedText);
    msidList.value = await JSON.stringify(parsedText);
})

executeBtn.addEventListener('click', async () => {
    if (thisUser.isWix) {
        const targetUserId = thisUser.userId;

        executeBtn.disabled = true;

        for (const msid of msidList2) {
            await cloneSite(msid, targetUserId);
        }
        executeBtn.disabled = false;
    }
});





// XSRF-TOKEN
