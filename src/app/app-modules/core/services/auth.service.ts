import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  transactionId: any;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  login(userName: any, password: any, doLogout: any) {
    return this.http
      .post(environment.loginUrl, {
        userName: userName,
        password: password,
        doLogout: doLogout,
      })
      .pipe(
        map((res) => {
          console.log('res ************', res);
          return res;
        }),
      );
  }

  userLogoutPreviousSession(userName: any) {
    return this.http
      .post(environment.userLogoutPreviousSessionUrl, { userName: userName })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }

  getUserSecurityQuestionsAnswer(uname: any): Observable<any> {
    return this.http
      .post(environment.getUserSecurityQuestionsAnswerUrl, {
        userName: uname.toLowerCase(),
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }

  getSecurityQuestions() {
    return this.http.get(environment.getSecurityQuestionUrl).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  saveUserSecurityQuestionsAnswer(userQuestionAnswer: any) {
    return this.http
      .post(environment.saveUserSecurityQuestionsAnswerUrl, userQuestionAnswer)
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }

  setNewPassword(userName: string, password: string, transactionId: any) {
    return this.http
      .post(environment.setNewPasswordUrl, {
        userName: userName,
        password: password,
        transactionId: transactionId,
      })
      .pipe(
        map((res) => {
          return res;
        }),
      );
  }

  validateSessionKey() {
    return this.http.post(environment.getSessionExistsURL, {}).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  logout() {
    return this.http.post(environment.logoutUrl, '').pipe(
      map((res) => {
        return res;
      }),
    );
  }
  getSwymedLogout() {
    return this.http.get(environment.getSwymedLogoutUrl).pipe(
      map((res: any) => res.json()),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  getUIVersionAndCommitDetails(url: any) {
    return this.http.get(url);
    //.map((res) => res.json());
  }
  getAPIVersionAndCommitDetails() {
    return this.http.get(environment.apiVersionUrl);
    //.map((res) => res.json());
  }
  validateSecurityQuestionAndAnswer(ans: any, uname: any): Observable<any> {
    return this.http.post(environment.validateSecurityQuestions, {
      SecurityQuesAns: ans,
      userName: uname,
    });
    //.map((res) => res.json());
  }
  getTransactionIdForChangePassword(uname: any): Observable<any> {
    return this.http.post(environment.getTransacIDForPasswordChange, {
      userName: uname,
    });
    //.map((res) => res.json());
  }
}
