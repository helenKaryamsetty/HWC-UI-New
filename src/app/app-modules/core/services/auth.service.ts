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
    return this.http.post(environment.loginUrl, {
      userName: userName,
      password: password,
      doLogout: doLogout,
    });
  }

  userLogoutPreviousSession(userName: any) {
    return this.http.post(environment.userLogoutPreviousSessionUrl, {
      userName: userName,
    });
  }

  getUserSecurityQuestionsAnswer(uname: any): Observable<any> {
    return this.http.post(environment.getUserSecurityQuestionsAnswerUrl, {
      userName: uname.toLowerCase(),
    });
  }

  getSecurityQuestions() {
    return this.http.get(environment.getSecurityQuestionUrl);
  }

  saveUserSecurityQuestionsAnswer(userQuestionAnswer: any) {
    return this.http.post(
      environment.saveUserSecurityQuestionsAnswerUrl,
      userQuestionAnswer,
    );
  }

  setNewPassword(userName: string, password: string, transactionId: any) {
    return this.http.post(environment.setNewPasswordUrl, {
      userName: userName,
      password: password,
      transactionId: transactionId,
    });
  }

  validateSessionKey() {
    return this.http.post(environment.getSessionExistsURL, {});
  }

  logout() {
    return this.http.post(environment.logoutUrl, '');
  }
  getSwymedLogout() {
    return this.http.get(environment.getSwymedLogoutUrl);
  }

  getUIVersionAndCommitDetails(url: any) {
    return this.http.get(url);
  }
  getAPIVersionAndCommitDetails() {
    return this.http.get(environment.apiVersionUrl);
  }
  validateSecurityQuestionAndAnswer(ans: any, uname: any): Observable<any> {
    return this.http.post(environment.validateSecurityQuestions, {
      SecurityQuesAns: ans,
      userName: uname,
    });
  }
  getTransactionIdForChangePassword(uname: any): Observable<any> {
    return this.http.post(environment.getTransacIDForPasswordChange, {
      userName: uname,
    });
  }
}
