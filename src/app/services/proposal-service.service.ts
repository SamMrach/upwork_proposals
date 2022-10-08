import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Proposal } from '../components/utils/Proposal';
import { proposals } from '../components/utils/proposals';
@Injectable({
  providedIn: 'root',
})
export class ProposalServiceService {
  proposals$: BehaviorSubject<Proposal[]> = new BehaviorSubject<Proposal[]>([
    ...proposals,
  ]);
  filter$ = new BehaviorSubject<String>('');
  constructor() {}

  addProposal(proposal: Proposal) {
    this.proposals$.next([...this.proposals$.getValue(), proposal]);
  }
  removeProposal(id: number): void {
    const props = this.proposals$.getValue().filter((prop) => prop.id !== id);
    this.proposals$.next(props);
  }
  editProposal(Proposal: Proposal): void {
    const updatedProps = this.proposals$.getValue().map((prop) => {
      if (prop.id == Proposal.id) {
        return {
          ...prop,
          title: Proposal.title,
          description: Proposal.description,
        };
      }
      return prop;
    });
    this.proposals$.next(updatedProps);
  }
  changeFilter(filtername: String) {
    this.filter$.next(filtername);
  }
}
