import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/admin/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent {
  usersList!: Observable<User[]>;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    this.usersList = this.getUsers();
  }

  getUsers(){
    return this.service.getUsers();
  }

  deleteUser(record:User){
    this.service.deleteUser(record.UID)
      .subscribe(p => this.usersList = this.getUsers());
  }

}
