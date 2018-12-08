import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';
import { CustomerStoreService } from './services/customer.store.service';


@Component({
  selector: 'ach-customers-container',
  template: `
    <p>
      customers-container Works!
    </p>
    <div>

      <ach-customers-list [customers] = "customers$ | async"
        (customerAdded) = "onCustomerAdded($event)"
        (customerSelected) = "onCustomerSelected($event)"></ach-customers-list>
    </div>

    <hr>
     <ach-customers-details [customer] = "selectedCustomer$ | async"></ach-customers-details>
     <br>
     
  `,
  styles: []
})
export class CustomersContainerComponent implements OnInit {

  customers$: Observable<Array<Customer>>;
  selectedCustomer$: Observable<Customer>;


  constructor(private customerStoreService: CustomerStoreService) {

    // get list of customers from the storeService
    this.customers$ = this.customerStoreService.getCustomers();

    // we need the selected customerid from the uiState, and use it 
    // to filter the customers that exists in the storeData
    // i've created a selector for this, in the storeService

    this.selectedCustomer$ = this.customerStoreService.getSelectedCustomer();





  }

  ngOnInit() {


  }

  onCustomerAdded(customer: Customer) {
    this.customerStoreService.addCustomer(customer);

  }

  onCustomerSelected(id: number) {
    this.customerStoreService.selectCustomer(id);
  }

}
