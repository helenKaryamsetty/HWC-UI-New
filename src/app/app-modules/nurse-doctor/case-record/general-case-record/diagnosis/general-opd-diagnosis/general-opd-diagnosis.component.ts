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
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  DoCheck,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { DoctorService } from '../../../../shared/services';
import { GeneralUtils } from '../../../../shared/utility';
import { ConfirmationService } from '../../../../../core/services/confirmation.service';
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'src/app/app-modules/core/components/set-language.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-opd-diagnosis',
  templateUrl: './general-opd-diagnosis.component.html',
  styleUrls: ['./general-opd-diagnosis.component.css'],
})
export class GeneralOpdDiagnosisComponent
  implements OnChanges, OnInit, DoCheck, OnDestroy
{
  utils = new GeneralUtils(this.fb);

  @Input()
  generalDiagnosisForm!: FormGroup;

  @Input()
  caseRecordMode!: string;

  @Input()
  visitCat: any;

  current_language_set: any;
  designation: any;
  specialist = false;
  constructor(
    private fb: FormBuilder,
    public httpServiceService: HttpServiceService,
    private doctorService: DoctorService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    this.designation = localStorage.getItem('designation');
    if (this.designation === 'TC Specialist') {
      this.generalDiagnosisForm.controls['instruction'].enable();
      this.specialist = true;
    } else {
      this.generalDiagnosisForm.controls['instruction'].disable();
      this.specialist = false;
    }
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.current_language_set = getLanguageJson.currentLanguageObject;
  }

  getProvisionalDiagnosisList(): AbstractControl[] | null {
    const provisionalDiagnosisListControl = this.generalDiagnosisForm.get(
      'provisionalDiagnosisList',
    );
    return provisionalDiagnosisListControl instanceof FormArray
      ? provisionalDiagnosisListControl.controls
      : null;
  }

  get specialistDaignosis() {
    return this.generalDiagnosisForm.get('instruction');
  }

  ngOnChanges() {
    if (String(this.caseRecordMode) === 'view') {
      const beneficiaryRegID = localStorage.getItem('beneficiaryRegID');
      const visitID = localStorage.getItem('visitID');
      const visitCategory = localStorage.getItem('visitCategory');

      const specialistFlagString = localStorage.getItem('specialist_flag');

      if (
        localStorage.getItem('referredVisitCode') === 'undefined' ||
        localStorage.getItem('referredVisitCode') === null
      ) {
        this.getDiagnosisDetails();
      } else if (
        specialistFlagString !== null &&
        parseInt(specialistFlagString) === 3
      ) {
        this.getMMUDiagnosisDetails(
          beneficiaryRegID,
          visitID,
          visitCategory,
          localStorage.getItem('visitCode'),
        );
      } else {
        this.getMMUDiagnosisDetails(
          beneficiaryRegID,
          localStorage.getItem('referredVisitID'),
          visitCategory,
          localStorage.getItem('referredVisitCode'),
        );
      }
    }
  }

  diagnosisSubscription!: Subscription;
  getDiagnosisDetails() {
    this.diagnosisSubscription =
      this.doctorService.populateCaserecordResponse$.subscribe((res) => {
        if (res && res.statusCode === 200 && res.data && res.data.diagnosis) {
          this.generalDiagnosisForm.patchValue(res.data.diagnosis);
          if (res.data.diagnosis.provisionalDiagnosisList) {
            this.patchDiagnosisDetails(
              res.data.diagnosis.provisionalDiagnosisList,
            );
          }
        }
      });
  }

  MMUdiagnosisSubscription: any;
  getMMUDiagnosisDetails(
    beneficiaryRegID: any,
    visitID: any,
    visitCategory: any,
    visitCode: any,
  ) {
    this.MMUdiagnosisSubscription = this.doctorService
      .getMMUCaseRecordAndReferDetails(
        beneficiaryRegID,
        visitID,
        visitCategory,
        visitCode,
      )
      .subscribe((res: any) => {
        if (res && res.statusCode === 200 && res.data && res.data.diagnosis) {
          this.generalDiagnosisForm.patchValue(res.data.diagnosis);
          if (res.data.diagnosis.provisionalDiagnosisList) {
            this.patchDiagnosisDetails(
              res.data.diagnosis.provisionalDiagnosisList,
            );
          }
        }
      });
  }

  patchDiagnosisDetails(provisionalDiagnosis: any) {
    const savedDiagnosisData = provisionalDiagnosis;
    const diagnosisArrayList = this.generalDiagnosisForm.controls[
      'provisionalDiagnosisList'
    ] as FormArray;
    if (
      provisionalDiagnosis[0].term !== '' &&
      provisionalDiagnosis[0].conceptID !== ''
    ) {
      for (let i = 0; i < savedDiagnosisData.length; i++) {
        diagnosisArrayList.at(i).patchValue({
          viewProvisionalDiagnosisProvided: savedDiagnosisData[i].term,
          term: savedDiagnosisData[i].term,
          conceptID: savedDiagnosisData[i].conceptID,
        });
        (<FormGroup>diagnosisArrayList.at(i)).controls[
          'viewProvisionalDiagnosisProvided'
        ].disable();
        if (diagnosisArrayList.length < savedDiagnosisData.length)
          this.addDiagnosis();
      }
    }
  }

  addDiagnosis() {
    const diagnosisArrayList = this.generalDiagnosisForm.controls[
      'provisionalDiagnosisList'
    ] as FormArray;
    if (diagnosisArrayList.length <= 29) {
      diagnosisArrayList.push(this.utils.initProvisionalDiagnosisList());
    } else {
      this.confirmationService.alert(
        this.current_language_set.alerts.info.maxDiagnosis,
      );
    }
  }

  removeDiagnosisFromList(
    index: any,
    diagnosisList?: AbstractControl<any, any>,
  ) {
    const diagnosisListForm = this.generalDiagnosisForm.controls[
      'provisionalDiagnosisList'
    ] as FormArray;
    if (!diagnosisListForm.at(index).invalid) {
      this.confirmationService
        .confirm(`warn`, this.current_language_set.alerts.info.warn)
        .subscribe((result) => {
          if (result) {
            const diagnosisListForm = this.generalDiagnosisForm.controls[
              'provisionalDiagnosisList'
            ] as FormArray;
            if (diagnosisListForm.length > 1) {
              diagnosisListForm.removeAt(index);
            } else {
              diagnosisListForm.removeAt(index);
              diagnosisListForm.push(this.utils.initProvisionalDiagnosisList());
            }
          }
        });
    } else if (diagnosisListForm.length > 1) {
      diagnosisListForm.removeAt(index);
    } else {
      diagnosisListForm.removeAt(index);
      diagnosisListForm.push(this.utils.initProvisionalDiagnosisList());
    }
  }

  checkProvisionalDiagnosisValidity(provisionalDiagnosis: any) {
    const temp = provisionalDiagnosis.value;
    if (temp.term && temp.conceptID) {
      return false;
    } else {
      return true;
    }
  }
  ngOnDestroy() {
    if (this.diagnosisSubscription) {
      this.diagnosisSubscription.unsubscribe();
    }
  }
}
