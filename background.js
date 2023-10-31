chrome.action.onClicked.addListener(async () => {
    const tabsQ = await chrome.tabs.query({ active: true, currentWindow: true});
    if (tabsQ.length > 0) {
    const response = await chrome.tabs.sendMessage(tabsQ[0].id, { action: "toggleSidePanel" });
    } else {
        console.warn('No active tabs');
    }
});