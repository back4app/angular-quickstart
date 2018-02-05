import {Component} from '@angular/core';
import {environment} from '../environments/environment';

declare const Parse: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email = '';
  password = '';
  rememberMe = false;

  constructor() {
    Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
    Parse.serverURL = environment.serverURL;
  }

  handleSubmit = () => {
    alert("email = " + this.email + ", password = " + this.password + ' and rememberMe = ' + this.rememberMe);

    const user = new Parse.User();
    user.set("username", this.email);
    user.set("email", this.email);
    user.set("password", this.password);
    user.set("rememberMe", this.rememberMe);

    user.signUp(null).then(
        function(user) {
            alert('User created successfully with email: ' + user.get("email"));
        },

        function(error) {
            alert("Error " + error.code + ": " + error.message);
        }
    );
  };

  handleUsernameChange = (event: KeyboardEvent) => {
      this.email = (<HTMLInputElement>event.target).value;
  };

  handlePasswordChange = (event: KeyboardEvent) => {
      this.password = (<HTMLInputElement>event.target).value;
  };

  handleRememberMeClick = () => {
      this.rememberMe = !this.rememberMe;
  };
}

