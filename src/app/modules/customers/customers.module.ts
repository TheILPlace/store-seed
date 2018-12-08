import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersContainerComponent } from './customers-container.component';
import { CustomersListComponent } from './customers-list.component';
import { CustomersDetailsComponent } from './customers-details.component';
import { CustomersResolverService } from './services/customers.resolver';
import { CustomerStoreService } from './services/customer.store.service';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersContainerComponent, CustomersListComponent, CustomersDetailsComponent],
  providers: [CustomersResolverService,
    CustomerStoreService]
})
export class CustomersModule { }
