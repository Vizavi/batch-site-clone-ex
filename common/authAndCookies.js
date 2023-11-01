import {getUserEmail} from './api.js';

export const getCookie = (name = 'XSRF-TOKEN') => {
    let cookieArr = document.cookie.split("; ");

    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        if (name == cookiePair[0]) {
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // return null if no cookies found
    throw new Error(`Cookie ${name} not found `);
    return null;
};

const checkWixCLient = async (thisUser) => {
    const wixCLientCookies = getCookie('wixClient');
    if (!wixCLientCookies || wixCLientCookies.length == 0) {
        throw new Error('Missing Wix Client cookies', thisUser);
        return;
    }
    console.log(wixCLientCookies);
    const clientData = wixCLientCookies.split('|')
    thisUser.userId = clientData[6];
    thisUser.isWix = clientData[8] == 'wix';
    console.log('clientData : ', clientData);
    return thisUser
}


export const getCurrentUserData = async (thisUser) => {
    thisUser = await checkWixCLient(thisUser);
    console.log('thisUser :',thisUser);
    if (thisUser.isWix) {
        await getUserEmail(thisUser, thisUser.userId);
       // userIdInput.value = userDaTA.userEmail;
    } else {
        throw new Error('Not Wix user', thisUser);
    }
    if (thisUser.userEmail.split('@')[1] != 'wix.com') {
        thisUser.isWix = false;
        throw new Error('Not Wix user', thisUser);
    }
    return thisUser;
}

// XSRF-TOKEN






// executeBtn.addEventListener('click', async () => {
//     if (thisUser.isWix) {
//         executeBtn.disabled = true;
//         for (const msid of msidList2) {
//             await cloneSite(msid, targetUserId);
//         }
//         executeBtn.disabled = false;
//     }
// });