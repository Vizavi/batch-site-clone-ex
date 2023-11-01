import { getSourceUserId, getSourcetSiteMetaSiteName, fetchSiteClone, postGlobalTest, getDuplicatedSiteInfo  } from "./api";
import { sleep } from "./utils";

// const targetUserId = "b5579173-171f-4d50-b95d-fb8f10674e69";
// //const sourceMsid = "937eda05-e072-4e36-a739-11e22858c397";

// const msidList2 = [
//     '83b32348-e7c2-4a29-b1b0-a753b75f51e2',
//     '5ed11ed4-62fb-4438-9dd6-f12b58db1ead',
//     '645265a3-a171-47c6-a00e-76c00fb24592',
// ];

let newGlobalTest = {
    persistantMSID: '',
    persistantMetaSiteName: '',
    persistantSiteName: '',
    editorType: '',
    is_processed_global: false,
    originalUserId: '',
    originalMSID: '',
    originalMetaSiteName: ''
}

export const cloneSite = async (sourceMsid, targetUserId) => {
    const targetPrefix = sourceMsid.split("-")[0];
    const sourceUserId = await getSourceUserId(sourceMsid);
    const sourceMetaSiteName = await getSourcetSiteMetaSiteName(sourceUserId, sourceMsid);
    const targetMetaSiteName = `coqq-${targetPrefix}`;
    // const targetMetaSiteName2 = ${targetPrefix}-mig;


    await fetchSiteClone(sourceUserId, sourceMetaSiteName, targetUserId, targetMetaSiteName);
    await sleep(5000);

    const clonnedSiteData = await getDuplicatedSiteInfo(targetUserId, targetMetaSiteName)
    // await cloneSite(sourceUserId,sourceMetaSiteName,targetUserId,targetMetaSiteName2);
    // await sleep(5000);

    newGlobalTest.persistantMSID = clonnedSiteData.metaSiteId;
    newGlobalTest.persistantMetaSiteName = clonnedSiteData.metaSiteName;
    newGlobalTest.persistantSiteName = clonnedSiteData.siteName;
    newGlobalTest.editorType = clonnedSiteData.editorInfo.editorTypeInfo.editorType;
    newGlobalTest.originalUserId = sourceUserId;
    newGlobalTest.originalMSID = sourceMsid;
    newGlobalTest.originalMetaSiteName = sourceMetaSiteName;

    await postGlobalTest(newGlobalTest);
};