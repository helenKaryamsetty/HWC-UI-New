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
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MasterdataService,
  NurseService,
  DoctorService,
} from '../../../shared/services';
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'src/app/app-modules/core/component/set-language.component';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.css'],
})
export class DiagnosisComponent implements OnInit, DoCheck {
  @Input()
  generalDiagnosisForm!: FormGroup;

  @Input()
  visitCategory!: string;

  @Input()
  caseRecordMode!: string;
  current_language_set: any;

  constructor(
    private fb: FormBuilder,
    public httpServiceService: HttpServiceService,
    private nurseService: NurseService,
    private doctorService: DoctorService,
    private masterdataService: MasterdataService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    // this.httpServiceService.currentLangugae$.subscribe(response =>this.current_language_set = response);
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.current_language_set = getLanguageJson.currentLanguageObject;
  }
}
