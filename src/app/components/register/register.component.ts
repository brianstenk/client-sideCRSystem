import { Component, OnInit } from '@angular/core';

import {User} from '../../model/user';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.currentUserValue) {
      this.router.navigate(['/home']);
      return;
    }
  }

  register(){
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if(!err || err.status !== 409) {
        this.errorMessage = "Unexpected error occurred. Error : " + err;
      }else {
        this.errorMessage = "Username is already exist";
      }
    });
  }

}
