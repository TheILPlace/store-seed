import { Component, OnInit, Input } from '@angular/core';
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
    <button (click)="achi()">ggg</button>
  `,
  styles: []
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
