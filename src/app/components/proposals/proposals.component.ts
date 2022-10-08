import { Component, Input, OnInit } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ProposalServiceService } from 'src/app/services/proposal-service.service';
import { Proposal } from '../utils/Proposal';
import { proposals } from '../utils/proposals';

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css'],
})
export class ProposalsComponent implements OnInit {
  proposals: Observable<Proposal[]>;
  savedProps: Proposal[] = [];
  //savedProps: Observable<Proposal[]>;
  constructor(private proposalServ: ProposalServiceService) {
    this.proposals = proposalServ.proposals$;
    //this.savedProps=proposalServ.proposals$.pipe(map(proposal =>proposal.))
  }

  ngOnInit(): void {
    // this.proposals = proposals;
  }
  removeProposal(id: number): void {
    this.proposalServ.removeProposal(id);
  }
}
