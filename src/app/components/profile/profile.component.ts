import { Component, OnInit } from '@angular/core';

import {Transaction} from '../../model/transaction';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  transactionList: Array<Transaction>;

  constructor(private userService: UserService, private courseService: CourseService,
    private router: Router) {
      this.currentUser = this.userService.currentUserValue;
    }

  ngOnInit() {
    if(!this.currentUser){
      this.router.navigate(['/login']);
      return;
    }
    this.findTransactionsOfUser();
  }

  findTransactionsOfUser() {
    this.courseService.findTransactionsOfUser(this.currentUser.id).subscribe(data => {
      this.transactionList = data;
    });
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
