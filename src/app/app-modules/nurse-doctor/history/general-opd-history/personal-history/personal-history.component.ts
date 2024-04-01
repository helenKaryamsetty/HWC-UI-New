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
  DoCheck,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Form,
  AbstractControl,
} from '@angular/forms';
import {
  MasterdataService,
  NurseService,
  DoctorService,
} from '../../../shared/services';

import { ConfirmationService } from '../../../../core/services/confirmation.service';
import { ValidationUtils } from '../../../shared/utility/validation-utility';
import { BeneficiaryDetailsService } from '../../../../core/services/beneficiary-details.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { NcdScreeningService } from '../../../shared/services/ncd-screening.service';
import { PreviousDetailsComponent } from 'src/app/app-modules/core/component/previous-details/previous-details.component';
import { AllergenSearchComponent } from 'src/app/app-modules/core/component/allergen-search/allergen-search.component';
import { SetLanguageComponent } from 'src/app/app-modules/core/component/set-language.component';

@Component({
  selector: 'app-general-personal-history',
  templateUrl: './personal-history.component.html',
  styleUrls: ['./personal-history.component.css'],
})
export class GeneralPersonalHistoryComponent
  implements OnInit, DoCheck, OnDestroy
{
  @Input()
  generalPersonalHistoryForm!: FormGroup;

  @Input()
  mode!: string;

  @Input()
  visitType: any;

  masterData: any = null;
  personalHistoryData: any;

  tobaccoMasterData: any;
  previousSelectedTobaccoList: any = [];
  tobaccoSelectList: any = [];

  alcoholMasterData: any;
  previousSelectedAlcoholList: any = [];
  alcoholSelectList: any = [];
  componentFlag = false;
  enableAlert = true;

  allergyMasterData = [
    {
      alleryID: 1,
      allergyType: 'Drugs',
    },
    {
      alleryID: 2,
      allergyType: 'Food',
    },
    {
      alleryID: 3,
      allergyType: 'Environmental',
    },
  ];
  previousSelectedAlleryList: any = [];
  allerySelectList: any = [];
  currentLanguageSet: any;
  snomedTerm: any;
  snomedCode: any;
  selectedSnomedTerm: any;
  countForSearch = 0;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private nurseService: NurseService,
    private doctorService: DoctorService,
    public httpServiceService: HttpServiceService,
    private beneficiaryDetailsService: BeneficiaryDetailsService,
    private confirmationService: ConfirmationService,
    private masterdataService: MasterdataService,
    private ncdScreeningService: NcdScreeningService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    if (this.mode !== 'view' && this.mode !== 'update') {
      this.getMasterData();
    }
    this.getBeneficiaryDetails();

    this.generalHistorySubscription =
      this.doctorService.populateHistoryResponse$.subscribe((history) => {
        if (
          history !== null &&
          history.statusCode === 200 &&
          history.data !== null &&
          history.data.PersonalHistory
        ) {
          this.personalHistoryData = history.data.PersonalHistory;
          this.getMasterData();
        }
      });
    if (this.mode !== 'view' && this.mode !== 'update') {
      this.ncdScreeningService.enablingIdrs$.subscribe((response) => {
        if (response === true) {
          this.generalPersonalHistoryForm.reset();
        } else {
          this.generalPersonalHistoryForm.reset();
        }
      });
    }
  }

  ngOnDestroy() {
    //   let allergies = <FormArray>(
    //     this.generalPersonalHistoryForm.controls["allergicList"]
    //   );
    //   while (allergies.length) {
    //     allergies.removeAt(0);
    //  }
    this.generalPersonalHistoryForm.reset();

    if (this.nurseMasterDataSubscription)
      this.nurseMasterDataSubscription.unsubscribe();
    if (this.beneficiaryDetailSubscription)
      this.beneficiaryDetailSubscription.unsubscribe();
  }

  beneficiaryDetailSubscription: any;
  beneficiary: any;
  getBeneficiaryDetails() {
    this.beneficiaryDetailSubscription =
      this.beneficiaryDetailsService.beneficiaryDetails$.subscribe(
        (beneficiary) => {
          this.beneficiary = beneficiary;
        },
      );
  }

  nurseMasterDataSubscription: any;
  getMasterData() {
    this.nurseMasterDataSubscription =
      this.masterdataService.nurseMasterData$.subscribe((masterData) => {
        if (
          masterData &&
          (this.masterData === null || this.masterData === undefined)
        ) {
          this.masterData = masterData;
          this.tobaccoMasterData = masterData.typeOfTobaccoProducts;
          this.alcoholMasterData = masterData.typeOfAlcoholProducts;
          this.addMasters();
        }
      });
  }

  addMasters() {
    if (
      this.personalHistoryData !== null &&
      this.personalHistoryData !== undefined
    ) {
      this.generalPersonalHistoryForm.patchValue(this.personalHistoryData);
    }

    //Adding Allergy
    const allergicList = <FormArray>(
      this.generalPersonalHistoryForm.controls['allergicList']
    );
    if (allergicList.length < this.allergyMasterData.length) {
      const tempAllergy = allergicList.value;
      if (this.allergyMasterData) {
        const resultAllergy = this.allergyMasterData.filter((itemAllergy) => {
          const arrAllergy = tempAllergy.filter((valueAllergy: any) => {
            if (valueAllergy.allergyType !== null)
              return (
                valueAllergy.allergyType.allergyType === itemAllergy.allergyType
              );
          });
          const flagAllergy = arrAllergy.length === 0 ? true : false;
          return flagAllergy;
        });

        this.allerySelectList.push(resultAllergy.slice());
      }

      allergicList.push(this.initAllergyList());

      if (
        this.personalHistoryData !== null &&
        this.personalHistoryData !== undefined
      ) {
        this.handlePersonalAllergyHistoryData();
      }
    }

    //Adding Tobacco
    const tobaccoList = <FormArray>(
      this.generalPersonalHistoryForm.controls['tobaccoList']
    );
    const temp = tobaccoList.value;

    if (this.tobaccoMasterData) {
      const result = this.tobaccoMasterData.filter((item: any) => {
        const arr = temp.filter((value: any) => {
          if (value.tobaccoUseType !== null)
            return value.tobaccoUseType.habitValue === item.habitValue;
        });
        const flag = arr.length === 0 ? true : false;
        return flag;
      });
      this.tobaccoSelectList.push(result.slice());
    }
    tobaccoList.push(this.initTobaccoList());

    if (
      this.personalHistoryData !== null &&
      this.personalHistoryData !== undefined
    ) {
      this.handlePersonalTobaccoHistoryData();
    }

    //Adding Alcohol
    const alcoholList = <FormArray>(
      this.generalPersonalHistoryForm.controls['alcoholList']
    );
    const tempAlcohol = alcoholList.value;
    if (this.alcoholMasterData) {
      const resultAlcohol = this.alcoholMasterData.filter(
        (itemAlcohol: any) => {
          const arrAlcohol = tempAlcohol.filter((valueAlcohol: any) => {
            if (valueAlcohol.typeOfAlcohol !== null)
              return (
                valueAlcohol.typeOfAlcohol.habitValue === itemAlcohol.habitValue
              );
          });
          const flagAlcohol = arrAlcohol.length === 0 ? true : false;
          return flagAlcohol;
        },
      );
      this.alcoholSelectList.push(resultAlcohol.slice());
    }
    alcoholList.push(this.initAlcoholList());

    if (
      this.personalHistoryData !== null &&
      this.personalHistoryData !== undefined
    ) {
      this.handlePersonalAlcoholHistoryData();
    }
  }

  generalHistorySubscription: any;
  getGeneralHistory() {
    // this.generalHistorySubscription = this.doctorService.
    // populateHistoryResponse$
    //   .subscribe(history => {
    if (this.personalHistoryData !== null) {
      // this.personalHistoryData = history.data.PersonalHistory;
      this.generalPersonalHistoryForm.patchValue(this.personalHistoryData);
      this.handlePersonalTobaccoHistoryData();
      this.handlePersonalAlcoholHistoryData();
      this.handlePersonalAllergyHistoryData();
    }
    // });
  }

  handlePersonalTobaccoHistoryData() {
    const formArray = this.generalPersonalHistoryForm.controls[
      'tobaccoList'
    ] as FormArray;
    if (this.personalHistoryData && this.personalHistoryData.tobaccoList) {
      const temp = this.personalHistoryData.tobaccoList.slice();

      for (let i = 0; i < temp.length; i++) {
        const tobaccoType = this.tobaccoMasterData.filter((item: any) => {
          return item.habitValue === temp[i].tobaccoUseType;
        });

        if (tobaccoType.length > 0) {
          temp[i].tobaccoUseType = tobaccoType[0];
          if (
            temp[i].numberperDay !== undefined &&
            temp[i].numberperDay !== null
          ) {
            temp[i].number = temp[i].numberperDay;
            temp[i].perDay = true;
          } else if (
            temp[i].numberperWeek !== undefined &&
            temp[i].numberperWeek !== null
          ) {
            temp[i].number = temp[i].numberperWeek;
            temp[i].perDay = false;
          }
        }

        if (temp[i].tobaccoUseType) {
          const k: any = formArray.get('' + i);
          k.patchValue(temp[i]);
          k.markAsTouched();
          this.filterTobaccoList(temp[i].tobaccoUseType, i);
        }

        if (i + 1 < temp.length) this.addTobacco();
      }
    }
  }

  handlePersonalAlcoholHistoryData() {
    const formArray = this.generalPersonalHistoryForm.controls[
      'alcoholList'
    ] as FormArray;
    if (this.personalHistoryData && this.personalHistoryData.alcoholList) {
      const temp = this.personalHistoryData.alcoholList.slice();

      for (let i = 0; i < temp.length; i++) {
        const alcoholType = this.alcoholMasterData.filter((item: any) => {
          return item.habitValue === temp[i].alcoholType;
        });

        if (alcoholType.length > 0) temp[i].typeOfAlcohol = alcoholType[0];

        temp[i].avgAlcoholConsumption =
          this.masterData.quantityOfAlcoholIntake.filter((item: any) => {
            return item.habitValue === temp[i].avgAlcoholConsumption;
          })[0];

        if (temp[i].alcoholType) {
          const k: any = formArray.get('' + i);
          k.patchValue(temp[i]);
          k.markAsTouched();
          this.filterAlcoholList(temp[i].alcoholType, i);
        }

        if (i + 1 < temp.length) this.addAlcohol();
      }
    }
  }

  handlePersonalAllergyHistoryData() {
    const formArray = this.generalPersonalHistoryForm.controls[
      'allergicList'
    ] as FormArray;
    if (this.personalHistoryData && this.personalHistoryData.allergicList) {
      const temp = this.personalHistoryData.allergicList.slice();

      for (let i = 0; i < temp.length; i++) {
        let allergyType = null;
        allergyType = this.allergyMasterData.filter((item) => {
          return item.allergyType === temp[i].allergyType;
        });

        // if (this.snomedTerm.length > 0) temp[i].this.snomedTerm = this.snomedTerm[0];
        // if (this.snomedCode.length > 0) temp[i].this.snomedCode = this.snomedCode[0];

        if (allergyType.length > 0) temp[i].allergyType = allergyType[0];

        if (this.masterData.AllergicReactionTypes !== undefined) {
          temp[i].typeOfAllergicReactions =
            this.masterData.AllergicReactionTypes.filter((item: any) => {
              let flag = false;
              temp[i].typeOfAllergicReactions.forEach((element: any) => {
                if (element.name === item.name) flag = true;
              });
              return flag;
            });
        }

        if (temp[i].otherAllergicReaction) temp[i].enableOtherAllergy = true;

        if (temp[i].allergyType) {
          const k: any = formArray.get('' + i);
          k.patchValue(temp[i]);
          k.markAsTouched();
          this.filterAlleryList(temp[i].allergyType, i);
          // k.patchValue("allergyType" , temp[i].allergyType);
        }

        if (i + 1 < temp.length) this.addAllergy();
      }
    }
  }

  addTobacco() {
    const tobaccoList = <FormArray>(
      this.generalPersonalHistoryForm.controls['tobaccoList']
    );
    const temp = tobaccoList.value;

    if (this.tobaccoMasterData) {
      const result = this.tobaccoMasterData.filter((item: any) => {
        const arr = temp.filter((value: any) => {
          if (value.tobaccoUseType !== null)
            return value.tobaccoUseType.habitValue === item.habitValue;
        });
        const flag = arr.length === 0 ? true : false;
        return flag;
      });
      this.tobaccoSelectList.push(result.slice());
    }
    tobaccoList.push(this.initTobaccoList());
    console.log('tobacco Lists', this.tobaccoSelectList);
  }

  filterTobaccoList(tobacco: any, i: any, tobaccoForm?: FormGroup) {
    const previousValue = this.previousSelectedTobaccoList[i];

    if (tobaccoForm && tobacco.tobaccoUseType !== 'Other')
      tobaccoForm.patchValue({ otherTobaccoUseType: null });
    if (previousValue) {
      this.tobaccoSelectList.map((item: any, t: any) => {
        if (t !== i && previousValue.tobaccoUseType !== 'Other') {
          item.push(previousValue);
          this.sortTobaccoList(item);
        }
      });
    }

    this.tobaccoSelectList.map((item: any, t: any) => {
      const index = item.indexOf(tobacco);
      if (index !== -1 && t !== i && tobacco.tobaccoUseType !== 'Other') {
        item = item.splice(index, 1);
      }
    });

    this.previousSelectedTobaccoList[i] = tobacco;
  }

  removeTobacco(i: any, tobaccoForm?: FormGroup) {
    this.confirmationService
      .confirm(`warn`, this.currentLanguageSet.alerts.info.warn)
      .subscribe((result) => {
        if (result) {
          const tobaccoList = <FormArray>(
            this.generalPersonalHistoryForm.controls['tobaccoList']
          );
          this.generalPersonalHistoryForm.markAsDirty();
          if (tobaccoList.length === 1 && !!tobaccoForm) {
            tobaccoForm.reset();
          } else {
            const removedValue = this.previousSelectedTobaccoList[i];

            this.tobaccoSelectList.map((item: any, t: any) => {
              if (t !== i && !!removedValue) {
                item.push(removedValue);
                this.sortTobaccoList(item);
              }
            });

            this.previousSelectedTobaccoList.splice(i, 1);
            this.tobaccoSelectList.splice(i, 1);
            tobaccoList.removeAt(i);
          }
        }
      });
    this.generalPersonalHistoryForm.markAsDirty();
  }

  addAlcohol() {
    const alcoholList = <FormArray>(
      this.generalPersonalHistoryForm.controls['alcoholList']
    );
    const temp = alcoholList.value;
    if (this.alcoholMasterData) {
      const result = this.alcoholMasterData.filter((item: any) => {
        const arr = temp.filter((value: any) => {
          if (value.typeOfAlcohol !== null)
            return value.typeOfAlcohol.habitValue === item.habitValue;
        });
        const flag = arr.length === 0 ? true : false;
        return flag;
      });
      this.alcoholSelectList.push(result.slice());
    }
    alcoholList.push(this.initAlcoholList());
  }

  filterAlcoholList(alcohol: any, i: any, alcoholForm?: FormGroup) {
    const previousValue = this.previousSelectedAlcoholList[i];

    if (alcoholForm && alcohol.typeOfAlcohol !== 'Other')
      alcoholForm.patchValue({ otherAlcoholType: null });

    if (previousValue) {
      this.alcoholSelectList.map((item: any, t: any) => {
        if (t !== i && previousValue.typeOfAlcohol !== 'Other') {
          item.push(previousValue);
          this.sortAlcoholList(item);
        }
      });
    }

    this.alcoholSelectList.map((item: any, t: any) => {
      const index = item.indexOf(alcohol);
      if (index !== -1 && t !== i && alcohol.typeOfAlcohol !== 'Other') {
        item = item.splice(index, 1);
      }
    });

    this.previousSelectedAlcoholList[i] = alcohol;
  }

  removeAlcohol(i: any, alcoholForm?: FormGroup) {
    this.confirmationService
      .confirm(`warn`, this.currentLanguageSet.alerts.info.warn)
      .subscribe((result) => {
        if (result) {
          const alcoholList = <FormArray>(
            this.generalPersonalHistoryForm.controls['alcoholList']
          );
          this.generalPersonalHistoryForm.markAsDirty();
          if (alcoholList.length === 1 && !!alcoholForm) {
            alcoholForm.reset();
          } else {
            const removedValue = this.previousSelectedAlcoholList[i];

            this.alcoholSelectList.map((item: any, t: any) => {
              if (t !== i && !!removedValue) {
                item.push(removedValue);
                this.sortAlcoholList(item);
              }
            });

            this.previousSelectedAlcoholList.splice(i, 1);
            this.alcoholSelectList.splice(i, 1);
            alcoholList.removeAt(i);
          }
        }
      });
  }

  addAllergy() {
    const allergicList = <FormArray>(
      this.generalPersonalHistoryForm.controls['allergicList']
    );
    if (allergicList.length < this.allergyMasterData.length) {
      const temp = allergicList.value;
      if (this.allergyMasterData) {
        const result = this.allergyMasterData.filter((item) => {
          const arr = temp.filter((value: any) => {
            if (value.allergyType !== null)
              return value.allergyType.allergyType === item.allergyType;
          });
          const flag = arr.length === 0 ? true : false;
          return flag;
        });
        console.log('resultForterm', result);

        this.allerySelectList.push(result.slice());
      }
      // allergicList[0].patchValue({allergyName : allergicList.value.snomedTerm})

      console.log('allergicList', allergicList);
      allergicList.push(this.initAllergyList());
      console.log('allergicList', allergicList);
      console.log('allergy Lists', this.allerySelectList);
    }
  }

  filterAlleryList(allergy: any, i: any) {
    const previousValue = this.previousSelectedAlleryList[i];
    if (previousValue) {
      this.allerySelectList.map((item: any, t: any) => {
        if (t !== i) {
          item.push(previousValue);
          this.sortAllergyList(item);
        }
      });
    }
    this.allerySelectList.map((item: any, t: any) => {
      const index = item.indexOf(allergy);
      if (index !== -1 && t !== i) item = item.splice(index, 1);
    });
    this.previousSelectedAlleryList[i] = allergy;
  }

  removeAllergy(i: any, allergyForm?: FormGroup) {
    this.confirmationService
      .confirm(`warn`, this.currentLanguageSet.alerts.info.warn)
      .subscribe((result) => {
        if (result) {
          const allergicList = <FormArray>(
            this.generalPersonalHistoryForm.controls['allergicList']
          );
          this.generalPersonalHistoryForm.markAsDirty();
          if (allergicList.length === 1 && !!allergyForm) {
            allergyForm.reset();
            this.selectedSnomedTerm = null;
          } else {
            const removedValue = this.previousSelectedAlleryList[i];
            this.allerySelectList.map((item: any, t: any) => {
              if (t !== i && !!removedValue) {
                item.push(removedValue);
                this.sortAllergyList(item);
              }
            });
            this.previousSelectedAlleryList.splice(i, 1);
            this.allerySelectList.splice(i, 1);
            allergicList.removeAt(i);
            this.selectedSnomedTerm = null;
          }
        }
      });
  }

  initTobaccoList() {
    return this.fb.group({
      tobaccoUseTypeID: null,
      tobaccoUseType: null,
      otherTobaccoUseType: null,
      number: null,
      numberperDay: null,
      numberperWeek: null,
      perDay: null,
      duration: null,
      durationUnit: null,
    });
  }

  initAlcoholList() {
    return this.fb.group({
      alcoholTypeID: null,
      typeOfAlcohol: null,
      otherAlcoholType: null,
      alcoholIntakeFrequency: null,
      avgAlcoholConsumption: null,
      duration: null,
      durationUnit: null,
    });
  }

  initAllergyList() {
    return this.fb.group({
      allergyType: null,
      allergyName: null,
      snomedTerm: null,
      snomedCode: null,
      typeOfAllergicReactions: null,
      otherAllergicReaction: null,
      enableOtherAllergy: false,
    });
  }

  getPreviousTobaccoHistory() {
    const benRegID: any = localStorage.getItem('beneficiaryRegID');
    this.nurseService
      .getPreviousTobaccoHistory(benRegID, this.visitType)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            const title = this.currentLanguageSet.previousTobaccohistoryDet;
            if (res.data.data.length > 0) {
              this.viewPreviousData(res.data, title);
            } else {
              this.confirmationService.alert(
                this.currentLanguageSet.historyData.ancHistory
                  .previousHistoryDetails.pastHistoryalert,
              );
            }
          } else {
            this.confirmationService.alert(
              this.currentLanguageSet.alerts.info.errorFetchingHistory,
              'error',
            );
          }
        },
        (err) => {
          this.confirmationService.alert(
            this.currentLanguageSet.alerts.info.errorFetchingHistory,
            'error',
          );
        },
      );
  }
  get tobaccoList() {
    return this.generalPersonalHistoryForm.get('tobaccoList') as FormArray;
  }

  perDayChange() {
    console.log('perChange', this.generalPersonalHistoryForm);
    const validateTobaccoConsumption = this.generalPersonalHistoryForm.controls[
      'tobaccoList'
    ] as FormArray;
    console.log('validateTobaccoConsumption', validateTobaccoConsumption);
    validateTobaccoConsumption.value.forEach((patchNumber: any, i: any) => {
      if (patchNumber.perDay !== null && patchNumber.perDay === true) {
        (<FormGroup>validateTobaccoConsumption.at(i)).controls[
          'numberperWeek'
        ].setValue(null);
        (<FormGroup>validateTobaccoConsumption.at(i)).controls[
          'numberperDay'
        ].setValue(patchNumber.number);
      } else if (patchNumber.perDay !== null && patchNumber.perDay === false) {
        (<FormGroup>validateTobaccoConsumption.at(i)).controls[
          'numberperDay'
        ].setValue(null);
        (<FormGroup>validateTobaccoConsumption.at(i)).controls[
          'numberperWeek'
        ].setValue(patchNumber.number);
      }
    });
    console.log('perChange', this.generalPersonalHistoryForm);
  }

  getPreviousAlcoholHistory() {
    const benRegID: any = localStorage.getItem('beneficiaryRegID');
    this.nurseService
      .getPreviousAlcoholHistory(benRegID, this.visitType)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            const title = this.currentLanguageSet.previousAlcoholhistoryDet;
            if (res.data.data.length > 0) {
              this.viewPreviousData(res.data, title);
            } else {
              this.confirmationService.alert(
                this.currentLanguageSet.historyData.ancHistory
                  .previousHistoryDetails.pastHistoryalert,
              );
            }
          } else {
            this.confirmationService.alert(
              this.currentLanguageSet.alerts.info.errorFetchingHistory,
              'error',
            );
          }
        },
        (err) => {
          this.confirmationService.alert(
            this.currentLanguageSet.alerts.info.errorFetchingHistory,
            'error',
          );
        },
      );
  }

  getPreviousAllergyHistory() {
    const benRegID: any = localStorage.getItem('beneficiaryRegID');
    this.nurseService
      .getPreviousAllergyHistory(benRegID, this.visitType)
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200 && res.data !== null) {
            const title = this.currentLanguageSet.previousAllergyhistoryDet;
            if (res.data.data.length > 0) {
              this.viewPreviousData(res.data, title);
            } else {
              this.confirmationService.alert(
                this.currentLanguageSet.historyData.ancHistory
                  .previousHistoryDetails.pastHistoryalert,
              );
            }
          } else {
            this.confirmationService.alert(
              this.currentLanguageSet.alerts.info.errorFetchingHistory,
              'error',
            );
          }
        },
        (err) => {
          this.confirmationService.alert(
            this.currentLanguageSet.alerts.info.errorFetchingHistory,
            'error',
          );
        },
      );
  }

  viewPreviousData(data: any, title: any) {
    this.dialog.open(PreviousDetailsComponent, {
      data: { dataList: data, title: title },
    });
  }

  canEnableOtherAllergy(allergy: any) {
    const allergicList = allergy.value.typeOfAllergicReactions;
    let flag = false;
    allergicList.forEach((item: any) => {
      if (item.allergicReactionTypeID === 11) flag = true;
    });
    if (!flag) allergy.patchValue({ otherTypeOfAllergicReaction: null });

    allergy.patchValue({ enableOtherAllergy: flag });
  }

  get tobaccoUseStatus() {
    return this.generalPersonalHistoryForm.controls['tobaccoUseStatus'].value;
  }

  get alcoholIntakeStatus() {
    return this.generalPersonalHistoryForm.controls['alcoholIntakeStatus']
      .value;
  }

  get allergyStatus() {
    return this.generalPersonalHistoryForm.controls['allergyStatus'].value;
  }

  validateDuration(formGroup: FormGroup, event?: Event) {
    let duration = null;
    let durationUnit = null;
    let flag = true;

    if (formGroup.value.duration) duration = formGroup.value.duration;

    if (formGroup.value.durationUnit)
      durationUnit = formGroup.value.durationUnit;

    console.log(
      duration,
      durationUnit,
      this.beneficiary,
      this.beneficiary.ageVal,
    );

    if (duration !== null && durationUnit !== null)
      flag = new ValidationUtils().validateDuration(
        duration,
        durationUnit,
        this.beneficiary.age,
      );

    if (!flag) {
      this.confirmationService.alert(
        this.currentLanguageSet.alerts.info.durationGreaterThanAge,
      );
      formGroup.patchValue({ duration: null, durationUnit: null });
    }
  }
  checkTobaccoStatus() {
    const tobaccoList = <FormArray>(
      this.generalPersonalHistoryForm.controls['tobaccoList']
    );
    if (tobaccoList.length > 0) {
      tobaccoList.reset();
    }
  }
  checkAlcoholStatus() {
    const alcoholList = <FormArray>(
      this.generalPersonalHistoryForm.controls['alcoholList']
    );
    if (alcoholList.length > 0) {
      alcoholList.reset();
    }
  }
  checkAllergicStatus() {
    const allergicList = <FormArray>(
      this.generalPersonalHistoryForm.controls['allergicList']
    );
    if (allergicList.length > 0) {
      allergicList.reset();
    }
  }

  sortTobaccoList(tobaccoList: any) {
    tobaccoList.sort((a: any, b: any) => {
      if (a.habitValue === b.habitValue) return 0;
      if (a.habitValue < b.habitValue) return -1;
      else return 1;
    });
  }

  sortAlcoholList(alcoholList: any) {
    alcoholList.sort((a: any, b: any) => {
      if (a.habitValue === b.habitValue) return 0;
      if (a.habitValue < b.habitValue) return -1;
      else return 1;
    });
  }

  sortAllergyList(allergyList: any) {
    allergyList.sort((a: any, b: any) => {
      if (a.allergyType === b.allergyType) return 0;
      if (a.allergyType < b.allergyType) return -1;
      else return 1;
    });
  }

  checkTobaccoValidity(tobaccoForm: any) {
    const temp = tobaccoForm.value;
    if (
      temp.tobaccoUseType &&
      temp.number &&
      // temp.durationStatus &&
      temp.duration &&
      temp.durationUnit
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkAlcoholValidity(alcoholForm: any) {
    const temp = alcoholForm.value;
    if (
      temp.typeOfAlcohol &&
      temp.alcoholIntakeFrequency &&
      temp.avgAlcoholConsumption &&
      temp.duration &&
      temp.durationUnit
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkAllergyValidity(allergyForm: any) {
    const temp = allergyForm.value;
    if (
      temp.allergyType &&
      temp.snomedTerm &&
      temp.snomedCode &&
      temp.typeOfAllergicReactions
    ) {
      return false;
    } else {
      return true;
    }
  }

  searchComponents(
    term: string,
    i: any,
    allergyForm: AbstractControl<any, any>,
  ): void {
    const searchTerm = term;
    // let searchTerm = <FormArray>this.generalPersonalHistoryForm.controls['snomedTerm'];allergicList
    // let searchTerm = this.generalPersonalHistoryForm.controls['snomedTerm'];
    console.log('searchTerm', this.generalPersonalHistoryForm);
    if (searchTerm.length > 2) {
      const dialogRef = this.dialog.open(AllergenSearchComponent, {
        data: { searchTerm: searchTerm },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('result', result);
        if (result) {
          if (
            this.generalPersonalHistoryForm.value.allergicList !== undefined &&
            this.generalPersonalHistoryForm.value.allergicList.length > 0
          ) {
            // console.log("check",this.generalPersonalHistoryForm.value.allergicList.at(i).snomedTerm);
            // this.generalPersonalHistoryForm.value.allergicList[0].snomedTerm.patchValue(result.component);

            // this.generalPersonalHistoryForm.value.allergicList[0].patchValue({
            //   snomedTerm: result.component})
            // this.generalPersonalHistoryForm.controls['snomedTerm'].setValue(result.component);
            // this.generalPersonalHistoryForm.controls['snomedCode'].setValue(result.componentNo);
            this.selectedSnomedTerm = result.component;
            allergyForm.patchValue({ snomedTerm: result.component });
            allergyForm.patchValue({ snomedCode: result.componentNo });
            allergyForm.patchValue({ allergyName: result.component });
            this.countForSearch = i;
          }
          // this.familyHistoryForm.controls['testLoincCode'].setValue(result.d);
          this.componentFlag = true;
          //  this.generalPersonalHistoryForm.controls['snomedTerm'].disable();
          //  this.generalPersonalHistoryForm.controls['snomedCode'].disable();

          this.enableAlert = false;
        } else {
          this.enableAlert = true;
          this.snomedTerm === null;
          this.snomedCode === null;
        }
      });
    }
  }

  removeSnomedCode(allergyForm: any, index: any) {
    console.log(
      'value',
      allergyForm.value + 'indexx',
      index + 'searchTime',
      this.countForSearch,
    );
    if (this.selectedSnomedTerm === undefined) {
      this.countForSearch = index;
      this.selectedSnomedTerm = allergyForm.value.allergyName;
    }

    if (this.countForSearch < index) {
      this.selectedSnomedTerm = null;
    }

    if (this.selectedSnomedTerm && this.selectedSnomedTerm !== null) {
      if (
        allergyForm.value.snomedTerm !== undefined &&
        allergyForm.value.snomedTerm !== null &&
        allergyForm.value.snomedTerm.trim() !== this.selectedSnomedTerm.trim()
      ) {
        this.confirmationService.alert(
          this.currentLanguageSet.historyData.ancHistory
            .personalHistoryANC_OPD_NCD_PNC.snomedTermRemoved,
        );
        allergyForm.patchValue({ snomedCode: null });
        allergyForm.patchValue({ snomedTerm: null });
        allergyForm.patchValue({ allergyName: null });
        this.selectedSnomedTerm = null;
        this.countForSearch = index;
      } else if (allergyForm.value.snomedTerm === null) {
        this.confirmationService.alert(
          this.currentLanguageSet.historyData.ancHistory
            .personalHistoryANC_OPD_NCD_PNC.snomedTermRemoved,
        );
        allergyForm.patchValue({ snomedCode: null });
        allergyForm.patchValue({ snomedTerm: null });
        allergyForm.patchValue({ allergyName: null });
        this.selectedSnomedTerm = null;
        this.countForSearch = index;
      }
    }
    // if(this.countForSearch === 0){
    //   this.confirmationService.alert("Please select a valid snomed code");
    //   allergyForm.patchValue({ snomedTerm: null });
    //   this.countForSearch = 0;

    // }
  }
  ngDoCheck() {
    this.assignSelectedLanguage();
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }
}
