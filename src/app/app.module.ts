import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { httpInterceptorProviders } from './http-interceptors';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-components/user-list/user-list.component';
import { SingleUserComponent } from './components/user-components/single-user/single-user.component';
import { AddUserComponent } from './components/user-components/add-user/add-user.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { UserFormComponent } from './components/user-components/user-form/user-form.component';
import { PermissionPipe } from './pipes/permission.pipe';
import { SearchMachinesComponent } from './components/machine-components/search-machines/search-machines.component';
import { CreateMachineComponent } from './components/machine-components/create-machine/create-machine.component';
import { ErrorsHistoryComponent } from './components/machine-components/errors-history/errors-history.component';
import { UserPermissionsComponent } from './components/user-components/user-permissions/user-permissions.component';
import { UserCardComponent } from './components/user-components/user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    UserListComponent,
    SingleUserComponent,
    AddUserComponent,
    PermissionsComponent,
    UserFormComponent,
    PermissionPipe,
    SearchMachinesComponent,
    CreateMachineComponent,
    ErrorsHistoryComponent,
    UserPermissionsComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [DatePipe, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
