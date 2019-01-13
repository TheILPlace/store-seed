import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from './models/customer';

@Component({
  selector: 'ach-customers-details',
  template: `
    <p>
      customers-details Works!
    </p>
    <div>
    {{customer?.id}} : {{customer?.name}} - {{customer?.address}}
    </div>
    <button (click)="achi()">Mutate</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersDetailsComponent implements OnInit {
@Input() customer: Customer;

  constructor() { }

  ngOnInit() {
  }

  achi() {
    this.customer.name = 'df';

  }

}
