import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import custom route module....
// import { CoreModule } from './app-modules/core/core.module';
import { CoreModule } from './app-modules/core/core.module';

// Custom components import....
import { LoginComponent } from './user-login/login/login.component';
import { ServicePointComponent } from './user-login/service-point/service-point.component';

// // Custom services import....
// import { ServicePointService } from './service-point/service-point.service';
// import { ServicePointResolve } from './service-point/service-point-resolve.service';

import { ServiceComponent } from './user-login/service/service.component';
import { ResetPasswordComponent } from './user-login/reset-password/reset-password.component';
import { SetPasswordComponent } from './user-login/set-password/set-password.component';
import { SetSecurityQuestionsComponent } from './user-login/set-security-questions/set-security-questions.component';

import { TmLogoutComponent } from './user-login/tm-logout/tm-logout.component';
// import { HttpServiceService } from './app-modules/core/services/http-service.service';
// import { RegistrarService } from './app-modules/registrar/shared/services/registrar.service';
// import { FamilyTaggingService } from './app-modules/registrar/shared/services/familytagging.service';
// import { CbacService } from './app-modules/nurse-doctor/shared/services/cbac.service';
// import { HrpService } from './app-modules/nurse-doctor/shared/services/hrp.service';
// import { AudioRecordingService } from './app-modules/nurse-doctor/shared/services/audio-recording.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MaterialModule } from './app-modules/core/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UserLoginModule } from './user-login/user-login.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorService } from './app-modules/core/services/http-interceptor.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataSYNCModule } from './app-modules/data-sync/dataSync.module';
import { TestRoutingComponent } from './app-modules/test-routing/test-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServicePointComponent,
    ServiceComponent,
    ResetPasswordComponent,
    SetPasswordComponent,
    SetSecurityQuestionsComponent,
    TmLogoutComponent,
    TestRoutingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserLoginModule,
    MatGridListModule,
    DataSYNCModule,
    CoreModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  //providers: [ServicePointService, ServicePointResolve,HttpServiceService,RegistrarService,FamilyTaggingService, CbacService, HrpService, AudioRecordingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
