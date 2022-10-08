let d = document;
let API = chrome;

document.onreadystatechange = function () {
  if (document.readyState == 'complete') {
    insertIframe();
    insertFillButton();
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
  document.getElementsByClassName('theme-choice')[0].appendChild(fillBtn);
  // window.addEventListener('click', function (e) {
  //   if (document.getElementById('myIframe')?.contains(<Node>e.target)) {
  //     document
  //       .getElementsByClassName('myIframe')[0]
  //       .classList.toggle('hideIframe');
  //   }
  // });
}

chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg.msg === 'hideIframe') {
    document.getElementById('myIframe')?.classList.toggle('showIframe');
    document.getElementById('myIframe')?.classList.toggle('hideIframe');
  }
});
