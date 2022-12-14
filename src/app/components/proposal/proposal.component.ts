import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css'],
})
export class ProposalComponent implements OnInit {
  @Input('title') title: string | undefined;
  @Input('description') description: string | undefined;
  @Input('id') id: number | undefined;
  @Output() remove: EventEmitter<number> = new EventEmitter();
  constructor(private route: Router) {}

  ngOnInit(): void {}

  handleRemove() {
    this.remove.emit(this.id);
  }
  redirectToEdit() {
    this.route.navigate(['/edit'], { queryParams: { id: this.id } });
  }
  applyProposal() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      //console.log(tabs[0].id);
      tabs[0].id &&
        chrome.tabs.sendMessage(tabs[0].id, {
          msg: 'apply',
          body: this.description,
        });
    });
  }
}
