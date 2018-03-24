import { AngUsers } from './../models/angusers';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: Array<AngUsers> = [];

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }
  signUp(user: AngUsers) {
    this._userService.addUser(user)
      .subscribe(resUserData => { this.user.push(resUserData);
        this._router.navigate(['/login']);
       });
  }

}
