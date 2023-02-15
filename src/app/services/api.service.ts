import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Permission, User } from '../models';
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

  // getAllUsers() {
  //   return this.httpClient
  //     .get<any>(`${this.apiUrl}/api/users`)
  //     .pipe(
  //       catchError((error) => {
  //         if (error.status === 403) {
  //           return of({
  //             failed: true,
  //             message: 'Your session has expired. Please sign in again.',
  //           });
  //         } else {
  //           return of({
  //             failed: true,
  //             message: 'An unexpected error occured. Please try to sign out and sign in again.',
  //           });
  //         }
  //       })
  //     )
  //     .subscribe((response) => {
  //       if(response.failed) {
  //         alert(response.message);
  //         return;
  //       }
  //       this._users.next(response.users);
  //     });
  // }

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

  ngOnDestroy(): void {
    this._users.unsubscribe();
  }
}
