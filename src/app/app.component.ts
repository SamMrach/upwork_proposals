import { Component, OnInit } from '@angular/core';
import { Proposal } from './components/utils/Proposal';
import { proposals } from './components/utils/proposals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  hideIframe() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //console.log(tabs[0].id);
      tabs[0].id && chrome.tabs.sendMessage(tabs[0].id, { msg: 'hideIframe' });
    });
  }
}
