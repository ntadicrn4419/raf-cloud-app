import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Machine, Permission, User } from '../models';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnDestroy {
  
  private readonly apiUrl = environment.apiUrl;

  private _signedInUserEmail = new BehaviorSubject<string>('');
  signedInUserEmail$ = this._signedInUserEmail.asObservable();

  private _users = new BehaviorSubject<User[]>([]);
  users$ = this._users.asObservable();

  private _userMachines = new BehaviorSubject<Machine[]>([]);
  userMachines$ = this._userMachines.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        catchError((error) => {
          if (error.status === 403) {
            return of({
              failed: true,
              message: 'Invalid credentials.',
            });
          } else {
            return of({
              failed: true,
              message: 'An unexpected error occurred.',
            });
          }
        })
      )
      .subscribe((res: any) => {
        if (res.failed) {
          alert(res.message);
          return;
        }
        localStorage.clear();
        localStorage.setItem('jwt_token', res.jwt);
        localStorage.setItem('permissions', res.permissionList);
        localStorage.setItem('signedInUserEmail', email!);
        this._signedInUserEmail.next(email);
        this.router.navigate(['/users']);
      });
  }

  getAllUsers() {
    return this.httpClient
      .get<any>(`${this.apiUrl}/api/users`)
      .subscribe((response) => {
        this._users.next(response.users);
      });
  }

  createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    permissionList?: Permission[]
  ) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/users/add`, {
        firstname,
        lastname,
        email,
        password,
        permissionList,
      })
      .subscribe((response) => {
        this._users.next(response.users);
        this.router.navigate(['/users']);
      });
  }

  findUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/api/users/${email}`);
  }

  updateUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    permissionList?: Permission[]
  ) {
    return this.httpClient.put<any>(`${this.apiUrl}/api/users/update`, {
      firstname,
      lastname,
      email,
      password,
      permissionList,
    });
  }

  deleteUser(email: string) {
    return this.httpClient.post<any>(`${this.apiUrl}/api/users/delete`, {
      email,
    });
  }

  getUserMachines() {
    return this.httpClient
      .get<any>(`${this.apiUrl}/api/machines`)
      .subscribe((response) => {
        console.log(response);
        this._userMachines.next(response.machines);
      });
  }

  createMachine(name: string) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/machines/add`, {
        name,
      })
      .subscribe((response) => {
        this._userMachines.next(response.machines);
        this.router.navigate(['/search-machines']);
      });
  }

  destroyMachine(machine: Machine) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/machines/delete/${machine.id}`, {})
      .subscribe((response) => {
        let um = this._userMachines.getValue();
        um = um.filter((m) => m.id !== machine.id);
        this._userMachines.next(um);
      });
  }

  searchMachinesByFilters(
    name: string | null,
    status: string | null,
    runningDatetimeStarted: number | null,
    runningDatetimeStopped: number | null,
    createdDatetimeStarted: number | null,
    createdDatetimeStopped: number | null
  ) {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/machines/search-by-filters`,
      {
        name: name,
        status: status,
        runningStarted: runningDatetimeStarted,
        runningStopped: runningDatetimeStopped,
        createdAtLowerBound: createdDatetimeStarted,
        createdAtUpperBound: createdDatetimeStopped,
      }
    );
  }

  restartMachine(id: number) {
    return this.httpClient
      .put<any>(`${this.apiUrl}/api/machines/restart/${id}`, {});
  }
  stopMachine(id: number) {
    return this.httpClient
      .put<any>(`${this.apiUrl}/api/machines/stop/${id}`, {});
  }
  startMachine(id: number) {
    return this.httpClient
      .put<any>(`${this.apiUrl}/api/machines/start/${id}`, {});
  }

  scheduleMachineRestart(id: number, datetime: any) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/machines/schedule-restart`, {
        id: id,
        datetime: datetime,
      });
  }
  scheduleMachineStop(id: number, datetime: any) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/machines/schedule-stop`, {
        id: id,
        datetime: datetime,
      });
  }
  scheduleMachineStart(id: number, datetime: any) {
    return this.httpClient
      .post<any>(`${this.apiUrl}/api/machines/schedule-start`, {
        id: id,
        datetime: datetime,
      });
  }

  ngOnDestroy(): void {
    this._users.unsubscribe();
  }
}
