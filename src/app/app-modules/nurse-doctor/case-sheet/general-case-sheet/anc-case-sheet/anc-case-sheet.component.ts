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
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'src/app/app-modules/core/components/set-language.component';
import { SessionStorageService } from 'Common-UI/src/registrar/services/session-storage.service';

@Component({
  selector: 'app-anc-case-sheet',
  templateUrl: './anc-case-sheet.component.html',
  styleUrls: ['./anc-case-sheet.component.css'],
})
export class AncCaseSheetComponent implements OnChanges, OnInit, DoCheck {
  @Input()
  caseSheetData: any;
  @Input()
  previous: any;
  aNCDetailsAndFormula: any;
  aNCImmunization: any;
  current_language_set: any;

  constructor(
    public httpServiceService: HttpServiceService,
    readonly sessionstorage: SessionStorageService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.current_language_set = getLanguageJson.currentLanguageObject;
    if (
      this.current_language_set === undefined &&
      this.sessionstorage.getItem('currentLanguageSet')
    ) {
      this.current_language_set =
        this.sessionstorage.getItem('currentLanguageSet');
    }
  }

  ngOnChanges() {
    if (
      this.caseSheetData &&
      this.caseSheetData.nurseData &&
      this.caseSheetData.nurseData.anc
    ) {
      this.aNCDetailsAndFormula =
        this.caseSheetData.nurseData.anc.ANCCareDetail;
      this.aNCImmunization =
        this.caseSheetData.nurseData.anc.ANCWomenVaccineDetails;
    }
  }
  language_file_path: any = './assets/';
  language: any;

  changeLanguage() {
    this.language = sessionStorage.getItem('setLanguage');

    if (this.language !== undefined) {
      this.httpServiceService
        .getLanguage(this.language_file_path + this.language + '.json')
        .subscribe(
          (response: any) => {
            if (response) {
              this.current_language_set = response[this.language];
            } else {
              console.log(
                this.current_language_set.alerts.info.comingUpWithThisLang +
                  ' ' +
                  this.language,
              );
            }
          },
          (error) => {
            console.log(
              this.current_language_set.alerts.info.comingUpWithThisLang +
                ' ' +
                this.language,
            );
          },
        );
    } else {
      this.httpServiceService.currentLangugae$.subscribe(
        (response) => (this.current_language_set = response),
      );
    }
  }
}
