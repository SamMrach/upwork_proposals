let d = document;
let API = chrome;

document.onreadystatechange = function () {
  if (document.readyState == 'complete') {
    insertIframe();
    waitForElm().then((res) => {
      insertFillButton();
    });
  }
};
function insertIframe() {
  if (!d.querySelector('#iframe')) {
    var iframe = d.createElement('iframe');
    iframe.id = 'myIframe';
    iframe.className = 'myIframe';
    iframe.classList.add('hideIframe');
    let url = API.runtime.getURL('index.html');
    iframe.src = url;
    // iframe.setAttribute(
    //   'style',
    //   'position: fixed; top: 10px; right: 5%; height: 640px; border: none; width: 400px;z-index:10000'
    // );
    d.querySelector('body')?.append(iframe);
  }
}
function insertFillButton() {
  const fillBtn = document.createElement('button');
  fillBtn.id = 'fill-btn';
  fillBtn.innerHTML = 'Fill it';
  fillBtn.className = 'fillBtn';
  fillBtn.addEventListener('click', function () {
    document.getElementById('myIframe')?.classList.toggle('showIframe');
    document.getElementById('myIframe')?.classList.toggle('hideIframe');
  });
  document.querySelectorAll('#cover_letter_label')[0].appendChild(fillBtn);
}

chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg.msg === 'hideIframe') {
    document.getElementById('myIframe')?.classList.toggle('showIframe');
    document.getElementById('myIframe')?.classList.toggle('hideIframe');
  }
});
function waitForElm() {
  return new Promise((resolve) => {
    if (document.querySelectorAll('#cover_letter_label')[0]) {
      return resolve(document.querySelectorAll('#cover_letter_label')[0]);
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelectorAll('#cover_letter_label')[0]) {
        resolve(document.querySelectorAll('#cover_letter_label')[0]);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
