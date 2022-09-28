import { Component } from '@angular/core';
import { CentresService } from 'src/app/service/centres.service';
import { CurrentUserService } from './service/currentUser.service';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'SchoolHelp';

  constructor() {

  }
}
