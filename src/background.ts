chrome.tabs.onUpdated.addListener(handleUpdated);
function handleUpdated() {
  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   console.log(tabs[0].url);
  // });
}
