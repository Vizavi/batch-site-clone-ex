import { getCurrentUserData } from '../etc/authAndCookies.js';
const backOfficeLink = 'ui.shadcn.com';

let viewStates = {
    sidePanel: 'hidden',
    inputForm: 'hidden',
    progressForm: 'hidden',
    panelMessageForm: 'hidden',
}; 

const userDefault = {
    userId: '',
    isWix: true, 
    userEmail: '',
    displayName: 'Undefined',
    targetOption: 'thisUser',
}

function initializeUser() {
    const thisUserData = getCurrentUserData();
    const summaryData = {... userDefault, ...thisUserData};
    return summaryData
}

function initializeProcessing(user) {
    return {
        id: '',
        currentUser: user,
        targetOption: 'thisUser',
        targetUser: user,
        msidList: [],
        casesTotal:0,
        casesSuccess:0,
        casesFailed:0,
        startTime: 0,
        endTime: 0,
    }
}

export const init = () => {
    let thisUser = initializeUser();
    let thisProcessing = initializeProcessing(thisUser);

    let thisLocation = {
    href: window.location.href,
    isBackOffice: window.location.href.includes(backOfficeLink),
    }

    return {thisUser, thisProcessing, thisLocation, viewStates}
}


