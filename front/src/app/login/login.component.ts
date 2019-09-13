import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.username) {
      this.userService.register(this.username).subscribe((response: any) => {
        if (response && response.user_model) {
          this.userService.setUser(response.user_model);
          this.router.navigate(['/channels']);
        }
      });
      console.log("Login.");
    }
  }

}
