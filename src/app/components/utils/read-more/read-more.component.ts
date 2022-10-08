import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'read-more',
  template: `
    <div>
      <p [class.collapsed]="isCollapsed"><ng-content></ng-content></p>
    </div>
    <div (click)="isCollapsed = !isCollapsed" class="read_msg">
      {{ isCollapsed ? 'Read more' : 'Read less' }}
    </div>
  `,
  styles: [
    `
      p {
        height: fit-content;
        line-height: 20px;
      }
      .read_msg {
        color: #5e6d55 !important;
        cursor: pointer;
      }
      p.collapsed {
        max-height: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `,
  ],
})
export class ReadMoreComponent implements OnInit {
  isCollapsed = true;
  constructor() {}
  ngOnInit(): void {}
}
