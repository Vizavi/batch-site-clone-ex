import { getCookie } from "./authAndCookies";

const fetchData = async (url, bodyData = '', method = 'GET') => {
    let response = '';
    console.log('URL: ', url);
    if (method == 'GET') {
        response = await fetch(url);
    } else {
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        });
    }
    const data = await response.json();
    console.log('POST RESPONSE: ', data);
    return data;
}

export const postGlobalTest = async (postItem) => {
    const url = `https://evgenys23.wixsite.com/cfs1/_functions/addGlobalTest/`;
    const data = await fetchData(url, postItem, 'POST');
}

export const getUserEmail = async (thisUser) => {
    const url = `https://bo.wix.com/user-manager-server/v1/relevant-users?userId=${thisUser.userId}&paging.limit=1&paging.offset=0`
    const userDaTA = await fetchData(url);
    //console.log('User Data: ', userDaTA)
    if (userDaTA?.users.length < 1) throw new Error('User not found', thisUser);
    return userDaTA.users[0].email;
}

export const getSourceUserId = async (sourceMsid) => {
    const url = `https://bo.wix.com/user-manager-server/v1/user/meta_site_id/${sourceMsid}`
    const data = await fetchData(url);
    const id = data?.user.id;
    if (!id) throw new Error('User not found', data);
    return id;
};

export const getSourcetSiteMetaSiteName = async (sourceUserId, SourceMsid) => {

    const url = `https://bo.wix.com/user-manager-server/v1/sites/active/user/${sourceUserId}?userId=${sourceUserId}&paging.limit=10&filter.metaSiteIds=${SourceMsid}&filter.searchPhrase=`
    const data = await fetchData(url);
    const metaSiteName = await data.userSites[0].site.metaSiteName;
    console.log("Source Site Name :" + metaSiteName);
    return metaSiteName;
};

export const fetchSiteClone = async (
    sourceUserId,
    sourceMetaSiteName,
    targetUserId,
    targetMetaSiteName
) => {
    const response = await fetch(
        `https://bo.wix.com/user-manager-server/v1/sites/active/clone`,
        {
            headers: {
                "accept-language": "en-US,en;q=0.9",
                "x-xsrf-token": `${getCookie("XSRF-TOKEN")}`,
            },
            body: `{\"numberOfCopies\":1,\"sourceSite\":{\"accountId\":\"${sourceUserId}\",\"metaSiteName\":\"${sourceMetaSiteName}\"},\"targetSite\":{\"metaSiteName\":\"${targetMetaSiteName}\",\"userId\":\"${targetUserId}\"}}`,
            method: "POST",
            mode: "cors",
            credentials: "include",
        }
    );
    const data = await response.json();
    console.log(data.cloneResult[0]);
};

export const getDuplicatedSiteInfo = async (userId, siteName) => {
    const url = `https://bo.wix.com/user-manager-server/v1/sites/active/user/${userId}?userId=${userId}&accountId=${userId}&paging.limit=10`
    const data = await fetchData(url);
    const siteQ = await data.userSites.filter(site => site.site.displayName == siteName)[0];
    if (siteQ) {
        return siteQ.site
    } else {
        console.warn(`Site ${siteName} not found`)
        return false;
    }
};