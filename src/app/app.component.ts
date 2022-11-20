import { Component, OnInit } from '@angular/core';

import { CurrentUserService } from './service/currentUser.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  title = 'SchoolHelp';

  constructor(private userservice: UserService) {

  }
  ngOnInit(){
    // this.userservice.autoAuthUser();
  }
}
