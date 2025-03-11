// Create context menu when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendToArchive",
    title: "Send to archive.is",
    contexts: ["link"],
  });
});

function createArchiveUrl(url) {
  // Remove URL parameters (anything after '?'), usually telemetry
  url = url.split("?")[0];

  // Create and return the archive.is submission URL
  return `https://archive.is/submit/?url=${encodeURIComponent(url)}`;
}

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToArchive" && info.linkUrl) {
    const archiveUrl = createArchiveUrl(info.linkUrl);

    // Open tab in the background by setting active to false
    chrome.tabs.create({
      url: archiveUrl,
      active: false,
    });
  }
});

// Handle extension icon click (click on the extension icon)
chrome.action.onClicked.addListener((tab) => {
  const archiveUrl = createArchiveUrl(tab.url);

  chrome.tabs.update(tab.id, { url: archiveUrl });
});
