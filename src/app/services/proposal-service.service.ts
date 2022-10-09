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
  //filter$ = new BehaviorSubject<String>('');
  constructor() {
    if (!localStorage.getItem('proposals')) {
      localStorage.setItem('proposals', JSON.stringify(proposals));
    }
    this.proposals$.next(this.getLocalStorage());
  }

  addProposal(proposal: Proposal) {
    const actual = this.getLocalStorage();
    actual.push(proposal);
    localStorage.setItem('proposals', JSON.stringify(actual));
    this.proposals$.next(this.getLocalStorage());
  }
  removeProposal(id: number): void {
    let actual: Proposal[] = this.getLocalStorage();
    actual = actual.filter((prop) => prop.id !== id);
    localStorage.setItem('proposals', JSON.stringify(actual));
    //const props = this.proposals$.getValue().filter((prop) => prop.id !== id);
    this.proposals$.next(this.getLocalStorage());
  }
  editProposal(Proposal: Proposal): void {
    let actual: Proposal[] = this.getLocalStorage();
    const updatedProps = actual.map((prop) => {
      if (prop.id == Proposal.id) {
        return {
          ...prop,
          title: Proposal.title,
          description: Proposal.description,
        };
      }
      return prop;
    });
    localStorage.setItem('proposals', JSON.stringify(updatedProps));
    this.proposals$.next(this.getLocalStorage());
  }
  filterProposal(name: string) {
    this.proposals$.next(
      this.getLocalStorage().filter(
        (prop: Proposal) =>
          prop.title.toLowerCase().includes(name) ||
          prop.description.toLowerCase().includes(name)
      )
    );
  }
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('proposals') || '');
  }
}
