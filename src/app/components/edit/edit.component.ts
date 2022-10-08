import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { ProposalServiceService } from 'src/app/services/proposal-service.service';
import { Proposal } from '../utils/Proposal';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  isValid: boolean = true;
  currentId: number = 0;
  //currentProposal$:Observable<Proposal>=new Observable<Proposal>();
  currentProposal: Proposal | undefined;
  editFormProp = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    private ActiveRoute: ActivatedRoute,
    private route: Router,
    private propService: ProposalServiceService
  ) {
    this.ActiveRoute.queryParams.subscribe((params) => {
      console.log(params['id']);
      const prop = this.propService.proposals$
        .getValue()
        .filter((prop: Proposal) => prop.id == params['id'])[0];
      this.currentProposal = prop;
      this.currentId = prop.id;
      this.editFormProp.patchValue({
        title: this.currentProposal.title,
        description: this.currentProposal.description,
      });
    });
  }

  ngOnInit(): void {}
  cancel() {
    this.route.navigate(['/']);
  }
  handleEdit() {
    this.isValid = this.editFormProp.status == 'VALID';
    if (this.isValid) {
      const newProp: Proposal = {
        title: this.editFormProp.value.title || '',
        id: this.currentId,
        description: this.editFormProp.value.description || '',
        saved: true,
        favorite: false,
      };
      this.propService.editProposal(newProp);
      this.route.navigate(['/']);
    }
  }
}
