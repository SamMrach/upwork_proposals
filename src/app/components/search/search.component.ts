import { Component, OnInit } from '@angular/core';
import { ProposalServiceService } from 'src/app/services/proposal-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  constructor(private propService: ProposalServiceService) {}

  ngOnInit(): void {}
  handleInput() {
    this.propService.filterProposal(this.searchTerm);
  }
}
