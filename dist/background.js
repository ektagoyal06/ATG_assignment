// background.js

// Fires when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ ATG Profile Saver extension loaded.");
});

// Optional: Listen for messages from popup.js or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LOG") {
    console.log("Background received message:", message.payload);
    sendResponse({ status: "ok" });
  }
});

// Optional: Automatically inject content script on LinkedIn pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://www.linkedin.com/in/")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["popup.js"], // or a separate content script
    });
  }
});
