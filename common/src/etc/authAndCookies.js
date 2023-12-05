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

const checkWixCLient = async () => {
    const wixCLientCookies = getCookie('wixClient');
    if (!wixCLientCookies || wixCLientCookies.length == 0) {
        throw new Error('Missing Wix Client cookies');
        return;
    }
    const clientData = wixCLientCookies.split('|')
    const userId = clientData[6];
    const isWix = clientData[8] == 'wix';
    console.log('clientData : ', clientData);
    return {userId, isWix}
}


export const getCurrentUserData = async (thisUser) => {
    const user = thisUser
    const wixClient = await checkWixCLient();
    console.log('thisUser :',wixClient);
    if (wixClient.isWix) {
        wixClient.email = await getUserEmail(wixClient) || 'Undefined';
        wixClient.displayName = wixClient.email;
       // userIdInput.value = userDaTA.userEmail;
    } else {
        throw new Error('Not a Wix user', user);
    }
    if (wixClient.userEmail.split('@')[1] != 'wix.com') {
        wixClient.isWix = false;
        throw new Error('Not a Wix user', wixClient);
    }

    thisUser = {...user, ...wixClient}
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