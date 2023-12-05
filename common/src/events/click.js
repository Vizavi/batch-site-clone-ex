
import { parseStringToArray } from "../etc/utils";
import { updateProgressForm } from "../../../contentScript";
import { cloneSite } from '../../cloneSite.js';

export const onClickEvents = (thisProcessing, thisUser, remoteUser, msidList, cloneButton, extensionPanel) => {
    const thisMsidList = msidList;
    const clnBtn = cloneButton;
    const extPanel = extensionPanel;

    const getParsedMSIDList = () => {
        const rawMsidList = thisMsidList.getValue()
        if (rawMsidList.length < 1 ) return false;
        return parseStringToArray(rawMsidList);
    }

    function validateInputData (){
        console.log('111', thisProcessing.currentUser.isWix, '2222', thisProcessing.casesTotal, '3333', thisProcessing.targetUser.userId)
       const dataIsValid = thisProcessing?.currentUser?.isWix && thisProcessing.casesTotal> 0 && thisProcessing?.targetUser?.userId
       if (dataIsValid) {
        clnBtn.enable();
       } else {
        clnBtn.disable();
       }
       return dataIsValid;
    }

    const updateProcessingOnTargetChange = (option, thisProcessing, thisUser, remoteUser) => {
        if (option === 'thisUser') {
            thisProcessing.targetUser = thisUser;
        } else if (option === 'remoteUser') {
            thisProcessing.targetUser = remoteUser;
        } else {
            console.warn('Unknown target option: ', option);
        }    
            thisProcessing.targetOption = option;
    }

    const updateButtons = (selectedOption) => {
        document.querySelectorAll('.option-button').forEach(button => {
            const option = button.getAttribute('data-target-option');
            option === selectedOption ? button.setAttribute('data-state', 'active') : button.setAttribute('data-state', 'inactive')
        });
    }

    const handleOptionButtonClick = (event, thisProcessing, thisUser, remoteUser) => {
        console.log('Handle button click', event)
        const button = event.target;
        const targetOption = button.getAttribute('data-target-option');
        updateProcessingOnTargetChange(targetOption, thisProcessing, thisUser, remoteUser);
        updateButtons(thisProcessing.targetOption);
    }

    const handleTextButtonClick = (event) => {
        const parsedMsidList = getParsedMSIDList()
        if (!parsedMsidList ) return;
        
        const button = event.target;
    
        if (button.id === 'clearButton') {
            validateInputData();
        } else if ( button.id === 'validateButton') {
            const structuredInput =  JSON.stringify(parsedMsidList, null, 2);
            thisMsidList.setValue(structuredInput);
        }
    }

    const handleCloneButtonClick = async (event) => {
        thisProcessing.startTime = Number(Date.now());
        updateProgressForm(thisProcessing);
        extensionPanel.show.progressForm();
         for (const msid of thisProcessing.msidList) {
             await cloneSite(msid, thisProcessing.targetUser);
         }
        console.log('This user: ', thisUser);
        console.log('This processing: ', thisProcessing);
    }


    document.addEventListener('click', async function(event) {
        const targetClass = event.target.classList;
        if (targetClass.contains('option-button')) {
            handleOptionButtonClick(event, thisProcessing, thisUser, remoteUser);
        } else if (targetClass.contains('text-button')) {
            handleTextButtonClick(event);
        } else if (targetClass.contains('start-clone-button')) {
            await handleCloneButtonClick(event);
        } else if (event.target.id =='close-progressForm-button') {
            extensionPanel.show.inputForm();
        }
    });

}