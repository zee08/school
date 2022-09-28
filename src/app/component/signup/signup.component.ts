import { Component} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from "@angular/forms";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})

export class SignupComponent  {

  constructor(

  ) { }

  onSignup(form: NgForm){


  }

  }

  @Component({
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css']
  })

  export class LoginVolComponent  {

    constructor(){}

    onSignup(form: NgForm){


    }

    }


