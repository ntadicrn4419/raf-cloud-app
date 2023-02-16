import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/user-components/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { SingleUserComponent } from './components/user-components/single-user/single-user.component';
import { UserListComponent } from './components/user-components/user-list/user-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SearchMachinesComponent } from './components/machine-components/search-machines/search-machines.component';
import { CreateMachineComponent } from './components/machine-components/create-machine/create-machine.component';
import { ErrorsHistoryComponent } from './components/machine-components/errors-history/errors-history.component';

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
  {
    path: 'search-machines',
    canActivate: [AuthGuardService],
    component: SearchMachinesComponent,
  },
  {
    path: 'create-machine',
    canActivate: [AuthGuardService],
    component: CreateMachineComponent,
  },
  {
    path: 'errors-history',
    canActivate: [AuthGuardService],
    component: ErrorsHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
