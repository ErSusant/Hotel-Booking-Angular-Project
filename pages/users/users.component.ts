import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any[] = [];
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

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.users.getAllUsers().subscribe((Res: any[]) => {
      this.userList = Res;
    }, error => {
      console.error('Error fetching users', error);
    });
  }

  onSaveUser() {
    const action = this.userObj.id ? 'update' : 'create';  // Determine if creating or updating

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

  onEdit(data: any) {
    this.userObj = { ...data };  // Use spread operator to copy data
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this user?');
    if (isDelete) {
      this.users.deleteUser(id).subscribe(
        (res: any) => {
          if (res && res.result) {
            alert('User Deleted');
            this.getUsers();  // Refresh the user list after deletion
          } else {
            alert(res.message || 'Unexpected response format');
          }
        },
        error => {
          console.error('Error deleting user:', error);
          alert('An error occurred while deleting the user.');
        }
      );
    }
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

}
