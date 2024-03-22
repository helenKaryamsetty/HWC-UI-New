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
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetLanguageComponent } from 'src/app/app-modules/core/component/set-language.component';
import { ConfirmationService } from 'src/app/app-modules/core/services';
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { FamilyTaggingService } from '../../shared/services/familytagging.service';
import { RegistrarService } from '../../shared/services/registrar.service';

@Component({
  selector: 'app-edit-family-tagging',
  templateUrl: './edit-family-tagging.component.html',
  styleUrls: ['./edit-family-tagging.component.css'],
})
export class EditFamilyTaggingComponent implements OnInit {
  @ViewChild('editFamilyTaggingForm')
  form: any;

  currentLanguageSet: any;
  familyHead: any;
  relationWithHead: any;
  other: any;

  selectedMembersList: any[] = [];
  displayedColumns1 = [
    'sno',
    'memberId',
    'memberName',
    'familyName',
    'members',
    'action',
  ];

  disableForm = false;
  uncheckMember = true;
  familyDetails: any;
  showCheckbox = true;
  enableOther = false;
  relationShipList: any[] = [];
  disableUntag = true;
  memberFamilyId: any;
  headInFamily: any;
  countryID = 1;
  beneficiaryName: any;

  constructor(
    public httpServiceService: HttpServiceService,
    public matDialogRef: MatDialogRef<EditFamilyTaggingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmationService: ConfirmationService,
    private registrarService: RegistrarService,
    private familyTaggingService: FamilyTaggingService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    this.getRelationShipMaster();
    this.familyDetails = this.data.familyData;
    this.memberFamilyId = this.data.memberFamilyId;
    this.headInFamily = this.data.headInFamily;
    this.beneficiaryName = this.data.beneficiaryName;
    this.showCheckbox = this.data.isEdit;
    if (this.showCheckbox) {
      this.disableForm = true;
    } else {
      this.disableForm = false;
    }
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  resetEditFamilyTaggingorm() {
    this.form.reset();
    this.selectedMembersList.filter((item) => {
      item.selected = false;
    });
    this.selectedMembersList = [];
    this.uncheckMember = false;
    this.relationShipList = [];
    this.disableUntag = true;
    this.enableOther = false;
    if (this.showCheckbox) {
      this.disableForm = true;
    } else {
      this.disableForm = false;
    }
  }

  selectMember(event: any, item: any) {
    this.uncheckMember = true;
    if (event.checked) {
      item.selected = true;
      this.selectedMembersList.push(item);
    } else {
      const index = this.selectedMembersList.indexOf(item);
      this.selectedMembersList.splice(index, 1);
      item.selected = false;
    }
    this.form.reset();
    this.relationShipList = [];
    this.enableOther = false;
    if (this.selectedMembersList.length != 1) {
      this.disableForm = true;
    } else this.disableForm = false;

    if (this.selectedMembersList.length >= 1) {
      this.disableUntag = false;
    } else {
      this.disableUntag = true;
    }
  }

  relationShipType: any[] = [];
  getRelationShipMaster() {
    this.familyTaggingService
      .getRelationShips(this.countryID)
      .subscribe((res: any) => {
        if (res && res.statusCode === 200) {
          this.relationShipType = res.data.relationshipMaster;
        } else {
          this.confirmationService.alert(
            this.currentLanguageSet.issueFetchingRelationship,
            'error',
          );
        }
      });
  }

  populateRelation(isHead: any) {
    // this.relationShipType=[
    //   {
    //     "benRelationshipID": 16,
    //     "benRelationshipType": "Self",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 13,
    //     "benRelationshipType": "Aunt",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 6,
    //     "benRelationshipType": "Brother",
    //     "gender": "male"
    //   },
    //   {
    //     "benRelationshipID": 9,
    //     "benRelationshipType": "Daughter",
    //     "gender": "female"
    //   },
    //   {
    //     "benRelationshipID": 4,
    //     "benRelationshipType": "Father",
    //     "gender": "male"
    //   },
    //   {
    //     "benRelationshipID": 14,
    //     "benRelationshipType": "Grand Father",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 15,
    //     "benRelationshipType": "Grand Mother",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 5,
    //     "benRelationshipType": "Mother",
    //     "gender": "female"
    //   },
    //   {
    //     "benRelationshipID": 11,
    //     "benRelationshipType": "Other",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 7,
    //     "benRelationshipType": "Sister",
    //     "gender": "female"
    //   },
    //   {
    //     "benRelationshipID": 8,
    //     "benRelationshipType": "Son",
    //     "gender": "male"
    //   },
    //   {
    //     "benRelationshipID": 10,
    //     "benRelationshipType": "Spouse",
    //     "gender": "unisex"
    //   },
    //   {
    //     "benRelationshipID": 12,
    //     "benRelationshipType": "Uncle",
    //     "gender": "unisex"
    //   }
    // ];

    this.disableUntag = true;
    this.relationShipList = [];
    this.other = null;
    this.enableOther = false;
    if (isHead.toLowerCase() === 'yes') {
      const relation = this.relationShipType.filter((item) => {
        if (item.benRelationshipType.toLowerCase() === 'self') {
          this.relationShipList.push(item);
          return item.benRelationshipID;
        }
      });
      this.relationWithHead = relation[0].benRelationshipID;
    } else {
      this.relationShipType.filter((item) => {
        if (item.benRelationshipType.toLowerCase() !== 'self') {
          this.relationShipList.push(item);
        }
      });

      this.relationWithHead = null;
    }
  }

  checkOtherRelation(relationValue: any) {
    this.other = null;
    const relationTypeValue = this.relationShipType.filter((item) => {
      if (item.benRelationshipType.toLowerCase() === 'other') {
        return item;
      }
    });

    if (
      relationTypeValue !== undefined &&
      relationTypeValue !== null &&
      relationTypeValue.length > 0 &&
      relationTypeValue[0].benRelationshipID !== undefined &&
      relationTypeValue[0].benRelationshipID !== null &&
      relationTypeValue[0].benRelationshipID === relationValue
    ) {
      this.enableOther = true;
    } else {
      this.enableOther = false;
    }
  }

  saveFamilyTagging() {
    const typeOfRelation = this.relationShipType.filter((item) => {
      if (item.benRelationshipID === this.relationWithHead) return item;
    });
    // condition to check if head of the family is already present
    const familymembers: any[] = [];
    let headName: any = null;
    this.familyDetails.familyMembers.forEach((family: any) => {
      if (family.relationWithHead) familymembers.push(family.relationWithHead);
      if (family.relationWithHead.toLowerCase() === 'self')
        headName = family.memberName;
    });
    if (
      familymembers.includes('Self') &&
      typeOfRelation[0].benRelationshipType.toLowerCase() === 'self' &&
      this.selectedMembersList.length > 0 &&
      headName?.trim().toLowerCase() !==
        this.selectedMembersList[0].memberName.trim().toLowerCase()
    )
      this.confirmationService.alert(
        this.currentLanguageSet
          .HeadOfTheFamilyAlreadyPresentRemoveExistingAndContinue,
        'Info',
      );
    else if (
      familymembers.includes('Self') &&
      typeOfRelation[0].benRelationshipType.toLowerCase() === 'self' &&
      this.selectedMembersList.length == 0
    ) {
      this.confirmationService.alert(
        this.currentLanguageSet.HeadOfTheFamilyAlreadyPresentRemoveExisting,
        'Info',
      );
    } else {
      if (this.data.isEdit) {
        const requestObjEdit = {
          familyId: this.memberFamilyId,
          // "beneficiaryRegId": this.data.beneficiaryRegID,
          beneficiaryRegId: this.selectedMembersList[0].memberId,
          isHeadOfTheFamily:
            typeOfRelation[0].benRelationshipType.toLowerCase() === 'self'
              ? true
              : false,
          memberName: this.selectedMembersList[0].memberName,
          headofFamily_RelationID: this.relationWithHead,
          headofFamily_Relation: typeOfRelation[0].benRelationshipType,
          other: this.other,
          vanID: JSON.parse(localStorage.getItem('serviceLineDetails') || '{}')
            .vanID,
          parkingPlaceID: JSON.parse(
            localStorage.getItem('serviceLineDetails') || '{}',
          ).parkingPlaceID,
          modifiedBy: localStorage.getItem('userName'),
        };
        this.familyTaggingService.editFamilyTagging(requestObjEdit).subscribe(
          (res: any) => {
            if (res.statusCode == 200 && res.data) {
              this.confirmationService.alert(res.data.response, 'success');
              this.matDialogRef.close(true);
            } else {
              this.confirmationService.alert(res.errorMessage, 'error');
            }
          },
          (err: string) => {
            this.confirmationService.alert(err, 'error');
          },
        );
      } else {
        const requestObj = {
          familyId: this.memberFamilyId,
          beneficiaryRegId: this.data.beneficiaryRegID,
          isHeadOfTheFamily:
            typeOfRelation[0].benRelationshipType.toLowerCase() === 'self'
              ? true
              : false,
          memberName: this.beneficiaryName,
          headofFamily_RelationID: this.relationWithHead,
          headofFamily_Relation: typeOfRelation[0].benRelationshipType,
          other: this.other,
          vanID: JSON.parse(localStorage.getItem('serviceLineDetails') || '{}')
            .vanID,
          parkingPlaceID: JSON.parse(
            localStorage.getItem('serviceLineDetails') || '{}',
          ).parkingPlaceID,
          createdBy: localStorage.getItem('userName'),
        };
        this.familyTaggingService.saveFamilyTagging(requestObj).subscribe(
          (res: any) => {
            if (res.statusCode == 200 && res.data) {
              this.confirmationService.alert(res.data.response, 'success');
              this.matDialogRef.close(true);
            } else {
              this.confirmationService.alert(res.errorMessage, 'error');
            }
          },
          (err: string) => {
            this.confirmationService.alert(err, 'error');
          },
        );
      }
    }
  }

  untagFamilyMember() {
    const memberList: any[] = [];
    this.selectedMembersList.filter((item) => {
      memberList.push({
        familyId: this.memberFamilyId,
        // "beneficiaryRegId": this.data.beneficiaryRegID,
        beneficiaryRegId: item.memberId,
        isHeadOfTheFamily:
          item.relationWithHead.toLowerCase() === 'self' ? true : false,
        vanID: JSON.parse(localStorage.getItem('serviceLineDetails') || '{}')
          .vanID,
        parkingPlaceID: JSON.parse(
          localStorage.getItem('serviceLineDetails') || '{}',
        ).parkingPlaceID,
        modifiedBy: localStorage.getItem('userName'),
      });
    });

    const requestObj = {
      memberList: memberList,
    };
    this.familyTaggingService.untagFamilyMember(requestObj).subscribe(
      (res: any) => {
        if (res.statusCode == 200 && res.data) {
          this.confirmationService.alert(res.data.response, 'success');
          this.matDialogRef.close(true);
        } else {
          this.confirmationService.alert(res.errorMessage, 'error');
        }
      },
      (err: string) => {
        this.confirmationService.alert(err, 'error');
      },
    );
  }
}
