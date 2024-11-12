import { Component } from '@angular/core';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
 
userObj: any = {
  id: 0,
  fullname: "",
  username: "",
  password: "",
  email: "",
  mobile: 0,
  role: ""
};
constructor(private users: UsersService, private router: Router) { }
  userList: any[] =[];


onSaveUser() {
  const action = this.userObj.id ? 'update' : 'create';  // Determine if creating or updating
  console.log(this.userObj);
  this.users.addUpdateUser(this.userObj).subscribe((res: any) => {
    if (res.result) {
      alert(`User ${action}d successfully!`);
      this.getUsers();  // Refresh the user list after saving
      this.resetForm();  // Reset form after successful save
    } else {
      alert(res.message || 'An error occurred while saving the user.');
    }
  }, error => {
    console.error('Error while saving user:', error);
    alert('An error occurred while saving the user. Please check the console for more details.');
  });
}

resetForm() {
  this.userObj = {
    id: 0,
    fullname: "",
    username: "",
    password: "",
    email: "",
    mobile: 0,
    role: ""
  };
}
getUsers() {
  this.users.getAllUsers().subscribe((Res: any[]) => {
    this.userList = Res;
  }, error => {
    console.error('Error fetching users', error);
  });
}

}
