import { Injectable } from '@angular/core';
import { Store } from '../../core/store/store';
import { Customer } from '../models/customer';
import { UiStoreService } from '../../core/store/ui.store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




export class CustomerData {
    customers: Customer[];
    customersLoaded: boolean;
    selectedCustomerID: number;
}

const INITIAL_CUSTOMER_DATA: CustomerData = {
    customers: new Array<Customer>(),
    customersLoaded: false,
    selectedCustomerID: null

};

@Injectable()
export class CustomerStoreService extends Store<CustomerData> {
    constructor(private u: UiStoreService) {
        super('Customer',INITIAL_CUSTOMER_DATA)
    }

    public loadCustomers() {
        const customers = new Array<Customer>();
    
        const customer = new Customer;
        customer.id = 1;
        customer.name = 'John Doe';
        customer.address = 'the moon';
    
        const customer2 = new Customer;
        customer2.id = 2;
        customer2.name = 'King Solomon';
        customer2.address = 'Rome';
    
        customers.push(customer);
        customers.push(customer2);
    
        // newStoreData.customers = customers; 
    

        this.setState('[Customers] LOAD', { customers: customers, customersLoaded: true});
    
      }
    
    
      addCustomer(customer: Customer) {
    
        let newCustomers = [...this.getSnapshot().customers, customer];
        this.setState('[Customers] ADD',{customers: newCustomers})
   
      }


      selectCustomer(id: number) {
    
        this.setState('[Customers] SELECT',{selectedCustomerID: id})
       
      }



      
  getCustomers(): Observable<Array<Customer>> {
    return this.select(state => state.customers);
  }

  getSelectedCustomer(): Observable<Customer> {

    return this.select().pipe(
        map((state: CustomerData) => state.customers.filter((customer: Customer) => customer.id === state.selectedCustomerID)[0]));
    

    
  }




}
