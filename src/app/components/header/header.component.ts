import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // _url: string = '';
  // showAddBtn: boolean = false;
  constructor(private router: Router) {
    // this._url = this.router.url;
    // this.showAddBtn = this._url == '/';
    //console.log(this._url == '/');
  }

  ngOnInit(): void {}
  redirecToAdd() {
    this.router.navigate(['/add']);
  }
}
