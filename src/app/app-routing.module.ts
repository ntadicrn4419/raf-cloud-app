import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    component: UserListComponent,
  },
  {
    path: 'add-user',
    canActivate: [AuthGuardService],
    component: AddUserComponent,
  },
  {
    path: 'users/:email',
    canActivate: [AuthGuardService],
    component: SingleUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
