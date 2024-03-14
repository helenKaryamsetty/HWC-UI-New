import { BehaviorSubject } from 'rxjs';

export class BeneficiaryDetailsServiceStub {
  beneficiaryDetails = new BehaviorSubject<any>(null);
  beneficiaryDetails$ = this.beneficiaryDetails.asObservable();

  getBeneficiaryDetails(beneficiaryRegID: string) {}

  getBeneficiaryImage(beneficiaryRegID: string) {}

  reset() {}
}
