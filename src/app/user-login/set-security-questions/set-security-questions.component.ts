/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/app-modules/core/services';
import { ConfirmationService } from 'src/app/app-modules/core/services';

@Component({
  selector: 'app-set-security-questions',
  templateUrl: './set-security-questions.component.html',
  styleUrls: ['./set-security-questions.component.css'],
})
export class SetSecurityQuestionsComponent implements OnInit {
  passwordPattern =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

  uid: any;
  uname: any;
  passwordSection = false;
  questionsection = true;
  key: any;
  iv: any;
  SALT = 'RandomInitVector';
  Key_IV = 'Piramal12Piramal';
  _keySize: any;
  _ivSize: any;
  _iterationCount: any;
  encryptedConfirmPwd: any;
  password: any;

  constructor(
    public router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
  ) {
    this._keySize = 256;
    this._ivSize = 128;
    this._iterationCount = 1989;
  }

  ngOnInit() {
    this.uid = localStorage.getItem('userID');
    this.uname = localStorage.getItem('userName');
    this.authService.getSecurityQuestions().subscribe(
      (response: any) => this.handleSuccess(response),
      (error: any) => this.handleError(error),
    );
  }

  handleSuccess(response: any) {
    this.questions = response.data;
    this.replica_questions = response.data;

    this.Q_array_one = response.data;
    this.Q_array_two = response.data;
    console.log(this.questions);
  }

  handleError(response: any) {
    console.log('error', this.questions);
  }

  switch() {
    this.passwordSection = true;
    this.questionsection = false;
  }

  dynamictype: any = 'password';

  showPWD() {
    this.dynamictype = 'text';
  }

  hidePWD() {
    this.dynamictype = 'password';
  }

  question1: any = '';
  question2: any = '';
  question3: any = '';

  answer1: any = '';
  answer2: any = '';
  answer3: any = '';

  questions: any = [];
  replica_questions: any = [];
  Q_array_one: any = [];
  Q_array_two: any = [];

  selectedQuestions: any = [];

  updateQuestions(selectedques: any, position: any) {
    console.log('position', position, 'Selected Question', selectedques);
    console.log(
      'before if else block, selected questions',
      this.selectedQuestions,
    );

    if (this.selectedQuestions.indexOf(selectedques) === -1) {
      this.selectedQuestions[position] = selectedques;
      if (position === 0) {
        this.answer1 = '';
      }
      if (position === 1) {
        this.answer2 = '';
      }
      if (position === 2) {
        this.answer3 = '';
      }
      console.log('if block, selected questions', this.selectedQuestions);
    } else {
      if (this.selectedQuestions.indexOf(selectedques) !== position) {
        this.confirmationService.alert(
          'This question is already selected. Choose unique question',
        );
      }
    }
  }

  filterArrayOne(questionID: any) {
    /*filter the primary array based on the selection and feed resultant to Q_array_one*/
    this.Q_array_one = this.filter_function(questionID, this.Q_array_one);
    this.Q_array_two = this.filter_function(questionID, this.Q_array_two);
  }

  filterArrayTwo(questionID: any) {
    /*filter the Q_array_one based on the selection and feed resultant to Q_array_two*/
    this.Q_array_two = this.filter_function(questionID, this.Q_array_two);
    this.questions = this.filter_function(questionID, this.questions);
  }

  filterArrayThree(questionID: any) {
    this.Q_array_one = this.filter_function(questionID, this.Q_array_one);
    this.questions = this.filter_function(questionID, this.questions);
  }

  filter_function(questionID: any, array: any) {
    const dummy_array = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].QuestionID === questionID) {
        continue;
      } else {
        dummy_array.push(array[i]);
      }
    }
    return dummy_array;
  }

  dataArray: any = [];

  setSecurityQuestions() {
    if (this.selectedQuestions.length === 3) {
      this.dataArray = [
        {
          userID: this.uid,
          questionID: this.question1,
          answers: this.answer1,
          mobileNumber: '1234567890',
          createdBy: this.uname,
        },
        {
          userID: this.uid,
          questionID: this.question2,
          answers: this.answer2,
          mobileNumber: '1234567890',
          createdBy: this.uname,
        },
        {
          userID: this.uid,
          questionID: this.question3,
          answers: this.answer3,
          mobileNumber: '1234567890',
          createdBy: this.uname,
        },
      ];

      console.log('Request Array', this.dataArray);
      console.log('selected questions', this.selectedQuestions);

      this.switch();
    } else {
      this.confirmationService.alert(
        'All 3 questions should be different. Please check your selected questions',
      );
    }
  }

  oldpwd: any;
  newpwd: any;
  confirmpwd: any;

  get keySize() {
    return this._keySize;
  }

  set keySize(value) {
    this._keySize = value;
  }

  get iterationCount() {
    return this._iterationCount;
  }

  set iterationCount(value) {
    this._iterationCount = value;
  }

  generateKey(salt: any, passPhrase: any) {
    return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
      hasher: CryptoJS.algo.SHA512,
      keySize: this.keySize / 32,
      iterations: this._iterationCount,
    });
  }

  encryptWithIvSalt(salt: any, iv: any, passPhrase: any, plainText: any) {
    const key = this.generateKey(salt, passPhrase);
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  encrypt(passPhrase: any, plainText: any) {
    const iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(
      CryptoJS.enc.Hex,
    );
    const salt = CryptoJS.lib.WordArray.random(this.keySize / 8).toString(
      CryptoJS.enc.Hex,
    );
    const ciphertext = this.encryptWithIvSalt(salt, iv, passPhrase, plainText);
    return salt + iv + ciphertext;
  }

  updatePassword(new_pwd: any) {
    this.password = this.encrypt(this.Key_IV, new_pwd);
    this.encryptedConfirmPwd = this.encrypt(this.Key_IV, this.confirmpwd);
    if (new_pwd === this.confirmpwd) {
      this.authService
        .saveUserSecurityQuestionsAnswer(this.dataArray)
        .subscribe(
          (response: any) =>
            this.handleQuestionSaveSuccess(response, this.encryptedConfirmPwd),
          (error: any) => this.handleQuestionSaveError(error),
        );
    } else {
      this.confirmationService.alert("Password doesn't match");
    }
  }

  handleQuestionSaveSuccess(response: any, encryptedConfirmPwd: any) {
    if (
      response &&
      response.statusCode === 200 &&
      response.data.transactionId !== undefined &&
      response.data.transactionId !== null
    ) {
      console.log('saved questions', response);
      this.authService
        .setNewPassword(
          this.uname,
          encryptedConfirmPwd,
          response.data.transactionId,
        )
        .subscribe(
          (response: any) => this.successCallback(response),
          (error: any) => this.errorCallback(error),
        );
    } else {
      this.confirmationService.alert(response.errorMessage, 'error');
    }
  }

  handleQuestionSaveError(response: any) {
    console.log('question save error', response);
  }

  successCallback(response: any) {
    this.confirmationService.alert('Password changed successfully', 'success');
    this.logout();
  }

  errorCallback(response: any) {
    console.log(response);
  }

  logout() {
    this.authService.logout().subscribe((res: any) => {
      this.router.navigate(['/login']).then((result) => {
        if (result) {
          localStorage.clear();
          sessionStorage.clear();
        }
      });
    });
  }
}
