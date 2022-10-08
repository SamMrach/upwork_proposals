import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProposalServiceService } from 'src/app/services/proposal-service.service';
import { Proposal } from '../utils/Proposal';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  isValid: boolean = true;
  proposalForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(
    private propService: ProposalServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  handleSubmit() {
    this.isValid = this.proposalForm.status === 'VALID';
    if (this.isValid) {
      const newProp: Proposal = {
        title: this.proposalForm.value.title || '',
        id: Date.now(),
        description: this.proposalForm.value.description || '',
        saved: true,
        favorite: false,
      };
      this.propService.addProposal(newProp);
      this.router.navigate(['/']);
    }

    console.log(this.proposalForm);
  }
  cancel() {
    this.router.navigate(['/']);
  }
}
