//document.addEventListener('DOMContentLoaded', function() { /* ... */ }) 
import { getCurrentUserData } from './common/src/etc/authAndCookies.js';
import { cloneSite } from './common/cloneSite.js';
import { appendChilds, parseStringToArray, createElement, paragraph, nestedElements, groupAndAlignElements } from './common/src/etc/utils.js';
import { labledTextInput, labledTextArea, getTabPanel, getButtonGroup, spoileredElement, newButton} from './common/src/components/forms.js';
import { TEXT } from './common/constrains.js';
import { footer } from './common/src/components/baseElemnts.js';
import { remoteUser } from './common/remoteUserConfig.js';
import { sidePanel } from './common/src/forms/sidePanelBase.js';
import { onClickEvents } from './common/src/events/click.js';
import { init } from './common/src/forms/defaultState.js';
import { progressForm } from './common/src/forms/progressForm.js';

const backOfficeLink = 'ui.shadcn.com';


const {thisUser, thisProcessing, thisLocation, viewStates} = init();


 chrome.runtime.onMessage.addListener(handleMessage);

const footerDiv = footer();
const progrFrom = progressForm('Stupid tytle!!', 'Some text data 10/10');
const currentUserInput = labledTextInput('currentUserId', 'Current User', 'Current user', '', true);
const textButtonsUnderMSID = getButtonGroup();
const msidList = labledTextArea('msidList', 'MSID List', TEXT.PLACEHOLDER.MSID_LIST, '', false, textButtonsUnderMSID, updateProcessingOnMSIDListChange);
const tabPanel = getTabPanel();
const siteNameTemplate = labledTextInput('clonnedSiteName', 'Name template for the clonned sites', `'cln-' + %MSID(8)%`, `'cln-' + %MSID(8)%`, true);
const spoiler = spoileredElement('Difinition, avalible variables, etc',  paragraph(TEXT.DESCRIPTION.SITE_NAME_TEMPLATE_DEFINITION));
const cloneButton = newButton('start-clone-button', "Start cloning", '', true);
const closeButton = newButton('close-progressForm-button', "Close", '', false);
const buttonDiv = createElement('div', {class:'items-center justify-center pt-3 pb-0'});
buttonDiv.appendChild(closeButton.htmlElement);
progrFrom.htmlElement.appendChild(buttonDiv);

function getParsedMSIDList () {
    const rawMsidList = msidList.getValue()
    if (rawMsidList.length < 1 ) return false;
    return parseStringToArray(rawMsidList);
}

function updateProcessingOnMSIDListChange () {
    thisProcessing.msidList = getParsedMSIDList();
    thisProcessing.casesTotal = thisProcessing.msidList.length;
}

export function updateProgressForm () {
    const value = {
        total:thisProcessing.casesTotal,
        success:thisProcessing.casesSuccess,
        failed:thisProcessing.casesFailed,
        processingStatus: 'Cloning in progress',
        startTime: thisProcessing.startTime,
    }
    progrFrom.setValue(value);
}

const extensionPanel = sidePanel(viewStates);
document.body.insertAdjacentElement('beforeend', extensionPanel.htmlElement);

extensionPanel.htmlElement.appendChild(footerDiv);

extensionPanel.fullPanel.progressForm.appendChild(progrFrom.htmlElement);

extensionPanel.fullPanel.inputForm.appendChild(currentUserInput.htmlElement);
extensionPanel.fullPanel.inputForm.appendChild(msidList.htmlElement);
extensionPanel.fullPanel.inputForm.appendChild(tabPanel);
extensionPanel.fullPanel.inputForm.appendChild(siteNameTemplate.htmlElement);
extensionPanel.fullPanel.inputForm.appendChild(spoiler);
extensionPanel.fullPanel.inputForm.appendChild(cloneButton.htmlElement);

async function handleMessage(message, sender, sendResponse) {
    console.log("Received message from background script", message); 

    if (message.action === "toggleSidePanel") {
        if (extensionPanel.htmlElement.classList.contains('hidden')) {
            
           // console.log('Shjow side panel')
            extensionPanel.show.sidePanel();
            
            if (thisLocation.isBackOffice) {
                extensionPanel.show.inputForm();
                await getCurrentUserData(thisUser);
                currentUserInput.setValue('Alalalal');
            } else {
                extensionPanel.show.panelMessageForm();
             // extensionPanel.show.progressForm();
            }
            
            console.log('location: ', thisLocation);
            
        } else {
          //  console.log('Hide side panel');
            extensionPanel.hide.sidePanel();
          //  locationDiv.remove();
        }
    }
}
   
onClickEvents(thisProcessing, thisUser, remoteUser, msidList, cloneButton, extensionPanel);

