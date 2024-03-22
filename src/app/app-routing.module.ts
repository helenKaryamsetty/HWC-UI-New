import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './app-modules/core/services/auth-guard.service';
import { ServiceComponent } from './user-login/service/service.component';
import { LoginComponent } from './user-login/login/login.component';

import { ServicePointComponent } from './user-login/service-point/service-point.component';
// import { ServiceComponent } from './service/service.component';

import { SetPasswordComponent } from './user-login/set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './user-login/set-security-questions/set-security-questions.component';
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';
// import { AuthGuard } from './app-modules/core/services/auth-guard.service';
// import { ServicePointResolve } from './service-point/service-point-resolve.service';

// import { PreviousDetailsComponent } from './app-modules/core/components/previous-details/previous-details.component';
import { TmLogoutComponent } from './user-login/tm-logout/tm-logout.component';
import { ServicePointResolve } from './user-login/service-point/service-point-resolve.service';
import { TestRoutingComponent } from './app-modules/test-routing/test-routing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout-tm',
    component: TmLogoutComponent,
  },
  {
    path: 'set-security-questions',
    component: SetSecurityQuestionsComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'set-password',
    component: SetPasswordComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'service',
    component: ServiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'servicePoint',
    component: ServicePointComponent,
    canActivate: [AuthGuard],
    resolve: {
      servicePoints: ServicePointResolve,
    },
  },
  // {
  //   path: 'common/doctor-worklist',
  //   component: TestRoutingComponent
  // },
  {
    path: 'registrar',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app-modules/registrar/registrar.module').then(
        (m) => m.RegistrarModule,
      ),
  },
  {
    path: 'nurse-doctor',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./app-modules/nurse-doctor/nurse-doctor.module').then(
        (m) => m.NurseDoctorModule,
      ),

    // './app-modules/nurse-doctor/nurse-doctor.module#NurseDoctorModule'
  },
  // {
  //   path: 'lab',
  //   canActivate: [AuthGuard],
  //   loadChildren: './app-modules/lab/lab.module#LabModule'
  // },
  // {
  //   path: 'pharmacist',
  //   canActivate: [AuthGuard],
  //   loadChildren: './app-modules/pharmacist/pharmacist.module#PharmacistModule'
  // },
  // {
  //   path: 'datasync',
  //   canActivate: [AuthGuard],
  //   loadChildren: './app-modules/data-sync/dataSync.module#DataSYNCModule'
  //},
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
