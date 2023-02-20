// Add a listener to wait for the content script to be injected
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getParagraphs") {
    // Execute script to get paragraphs
    const paragraphs = [...document.getElementsByTagName("p")];
    const texts = paragraphs.map(p => p.innerText);
    sendResponse(texts);
  }
});

// Send message to background script to get paragraphs
chrome.runtime.sendMessage({ action: "getParagraphs" });


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getParagraphs" }, function(response) {
    console.log(response);
  });
});


