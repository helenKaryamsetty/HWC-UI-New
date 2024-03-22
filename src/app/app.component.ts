import { Component } from '@angular/core';
import {
  Router,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ResolveStart,
  NavigationCancel,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { SpinnerService } from './app-modules/core/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HWC-Facility-App';

  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    console.log('success');
  }
}
