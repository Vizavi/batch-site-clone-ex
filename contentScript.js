//document.addEventListener('DOMContentLoaded', function() { /* ... */ }) 
import { getCurrentUserData } from './common/authAndCookies.js';
import { cloneSite } from './common/cloneSite.js';
import { parseStringToArray } from './common/utils.js';
import { labledTextInput, getSidePanel, labledTextArea, createElement, getTabPanel, getButtonGroup, spoileredElement, paragraph, newButton} from './common/forms.js';
import { TEXTS } from './common/constrains.js';
import { footer } from './common/baseElemnts.js';

const matrixId = 'b5d67212-f61e-47ac-b10d-7bd67bafbb6b';
const vasylVId = 'b712d86e-d9ec-4856-9518-898648f8c96d';
const backOfficeLink = 'ui.shadcn.com';

const nameTemplateDeffinition = paragraph(TEXTS.SITE_NAME_TEMPLATE_DEFINITION);

const footerDiv = footer();

const progressPanelHtml = `<div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
<dl class="-my-3 divide-y divide-gray-100 text-sm">
  <div
    class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
  >
    <dt class="font-medium text-gray-900">Title</dt>
    <dd class="text-gray-700 sm:col-span-2">Mr</dd>
  </div>

  <div
    class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
  >
    <dt class="font-medium text-gray-900">Name</dt>
    <dd class="text-gray-700 sm:col-span-2">John Frusciante</dd>
  </div>

  <div
    class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
  >
    <dt class="font-medium text-gray-900">Occupation</dt>
    <dd class="text-gray-700 sm:col-span-2">Guitarist</dd>
  </div>

  <div
    class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
  >
    <dt class="font-medium text-gray-900">Salary</dt>
    <dd class="text-gray-700 sm:col-span-2">$1,000,000+</dd>
  </div>

  <div
    class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4"
  >
    <dt class="font-medium text-gray-900">Bio</dt>
    <dd class="text-gray-700 sm:col-span-2">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis
      debitis explicabo doloremque impedit nesciunt dolorem facere, dolor
      quasi veritatis quia fugit aperiam aspernatur neque molestiae labore
      aliquam soluta architecto?
    </dd>
  </div>
</dl>
</div>`

const progressPanel = document.createElement('div');
progressPanel.insertAdjacentHTML('afterbegin', progressPanelHtml);

function initializeUser() {
    return {
        userId: '',
        isWix: false, 
        userEmail: '',
        
    };
}

function initializeProcessing() {
    return {
        id: '',
        targetOption: 'thisUser',
        targetUserId: thisUser.userId,
        targetUserEmail: thisUser.userEmail,
        msidList: [],
        casesTotal:0,
        casesSuccess:0,
        casesFailed:0,
    }
}

let thisUser = initializeUser();
let thisProcessing = initializeProcessing();

let msidList2 = [];
let userIdList =[];
let targetOption ='0'

let thisLocation = {
    href: window.location.href,
    isBackOffice: window.location.href.includes(backOfficeLink),
}

 chrome.runtime.onMessage.addListener(handleMessage);

const currentURL = window.location.href;
console.log('currentURL', currentURL);


const currentUserForm = labledTextInput('currentUserId', 'Current User', 'Current user', '', true);
const butttonGroup = getButtonGroup();
const msidList = labledTextArea('msidList', 'MSID List', `List of the target sites MSID's, formatted in any reasonoble maner: "quoted" and (or) not, separated by dot, comma, both (;), spce(es), new line(es)`, '', false, butttonGroup);
const tabPanel = getTabPanel();
//const executeBtn = createElement('button', {id: 'startCloning', className: 'p-2 bg-blue-500 text-white rounded', innerText: 'Start cloning'});


//const newInput = labledTextInput('First-input', 'first IN', 'truOne 111', '', false);

const siteNameTemplate = labledTextInput('clonnedSiteName', 'Name template for the clonned sites', `'cln-' + %MSID(8)%`, `'cln-' + %MSID(8)%`, true);
const spoiler = spoileredElement('Difinition, avalible variables, etc', nameTemplateDeffinition);
//console.log('spoiler', spoiler);
//const bgroup = createElement('div', {class:'p-6 pt-0 space-y-2'});
//bgroup.appendChild(newInput);
//bgroup.appendChild(newInput2);

const extensionPanel = getSidePanel();
document.body.insertAdjacentElement('beforeend', extensionPanel.htmlElement);


function updateButtons(selectedOption) {
    document.querySelectorAll('.option-button').forEach(button => {
        const option = button.getAttribute('data-target-option');
        option === selectedOption ? button.setAttribute('data-state', 'active') : button.setAttribute('data-state', 'inactive')
    });
}

function handleTextButtonClick(event) {
    console.log('Handle text click', event)
    if (String(msidList.msidInput.value).length < 1 ) return;
    const rawMsidList = msidList.msidInput.value;

    const button = event.target;
    const textButtonId = button.getAttribute('id');

    if (button.id === 'clearButton') {
        msidList.msidInput.value = '';
    } else if ( button.id === 'validateButton') {
        msidList.msidInput.value = JSON.stringify(parseStringToArray(rawMsidList), null, 2);
    }
}

const cloneButton = newButton('start-clone', "Start cloning", '', false);

function handleOptionButtonClick(event) {
    console.log('Handle button click', event)
    const button = event.target;
    thisProcessing.targetOption = button.getAttribute('data-target-option');
    updateButtons(thisProcessing.targetOption);
}

extensionPanel.htmlElement.appendChild(footerDiv);

extensionPanel.fullPanel.progressForm.appendChild(progressPanel);

extensionPanel.fullPanel.inputForm.appendChild(currentUserForm);
extensionPanel.fullPanel.inputForm.appendChild(msidList.htmlElement);
extensionPanel.fullPanel.inputForm.appendChild(tabPanel);
//extensionPanel.nestedHtmlElement.appendChild(executeBtn);
extensionPanel.fullPanel.inputForm.appendChild(siteNameTemplate);
extensionPanel.fullPanel.inputForm.appendChild(spoiler);
extensionPanel.fullPanel.inputForm.appendChild(cloneButton.htmlElement);
//extensionPanel.fullPanel.inputGroup.appendChild(footerDiv);
//extensionPanel.nestedHtmlElement.appendChild(div1);
//extensionPanel.appendChild(newInput);

//extensionPanel.htmlElement.appendChild(locationDiv);

async function handleMessage(message, sender, sendResponse) {
    console.log("Received message from background script", message); 

        console.log('HTML ELEMENT: ', extensionPanel.htmlElement);
    if (message.action === "toggleSidePanel") {
        if (extensionPanel.htmlElement.classList.contains('hidden')) {
            
            console.log('Shjow side panel')
            extensionPanel.show.sidePanel();
            
            if (thisLocation.isBackOffice) {
                extensionPanel.show.inputForm();
                thisUser = await getCurrentUserData(thisUser);
                userIdInput.value = thisUser.userEmail;
                userIdList = [matrixId, vasylVId, thisUser.userId];
            } else {
              //  extensionPanel.show.panelMessageForm();
              extensionPanel.show.progressForm();
            }
            
            console.log('location: ', thisLocation);
            
        } else {
            console.log('Hide side panel');
            extensionPanel.hide.sidePanel();
          //  locationDiv.remove();
        }
    }
}
   
   

document.addEventListener('click', function(event) {
    const targetClass = event.target.classList;
    if (targetClass.contains('option-button')) {
        handleOptionButtonClick(event);
    } else if (targetClass.contains('text-button')) {
        handleTextButtonClick(event);
    } else if (targetClass.contains('start-clone-button')) {
        handleCloneButtonClick(event);
    }
});
/*


messageDiv.addEventListener('click', () => {
    const validationLinke = 'https';

if (currentURL.includes(validationLinke)) {
    messageDiv.classList.add('hidden'); 
   // sidePanelGrid.appendChild(labledInput);
    sidePanelGrid.appendChild(msidListColl);
    sidePanelGrid.appendChild(executeBtn);
} else {
    window.open(validationLinke, '_blank');
    messageDiv.classList.remove('hidden');
    sidePanelGrid.appendChild(messageDiv);
}
});

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


const findElementAndAttachEventListener = (id, eventType, handler) => {
    const element = document.getElementById('some-element-id');
if (element) {
    element.addEventListener('click', someFunction);
} else {
    console.error('Element not found');
}
}


slider.addEventListener('input', handleSliderInput);

document.getElementById('executeBtn').addEventListener('click', handleExecuteClick);

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
*/
// executeBtn.addEventListener('click', async () => {
//     if (thisUser.isWix) {
//         const targetUserId = userIdList[targetOption];
//         msidList2 = await parseStringToArray(msidList.value);
//         executeBtn.disabled = true;

//         grid.classList.add('hidden');
//         sidePanelGrid.appendChild(spinner2);


//        // sidePanelPreloader.classList.remove('hidden');
//         //sidePanelPreloader.classList.remove('hidden');
//         for (const msid of msidList2) {
//             await cloneSite(msid, targetUserId);
//         }
//         executeBtn.disabled = false;
//     }
// });