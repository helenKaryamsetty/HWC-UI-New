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
import { SessionStorageService } from 'Common-UI/src/registrar/services/session-storage.service';
import { AuthService } from 'src/app/app-modules/core/services';
@Component({
  selector: 'app-tm-logout',
  templateUrl: './tm-logout.component.html',
  styleUrls: ['./tm-logout.component.css'],
})
export class TmLogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    readonly sessionstorage: SessionStorageService,
  ) {}

  ngOnInit() {
    sessionStorage.clear();
    this.sessionstorage.clear();
    this.router.navigate(['/login']);
  }
}
