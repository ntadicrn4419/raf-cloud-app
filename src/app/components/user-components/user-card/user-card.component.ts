import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  @Input() hover: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
