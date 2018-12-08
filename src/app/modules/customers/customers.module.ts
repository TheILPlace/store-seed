import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersContainerComponent } from './customers-container.component';
import { CustomersListComponent } from './customers-list.component';
import { CustomersDetailsComponent } from './customers-details.component';
import { CustomersResolverService } from './services/customers.resolver';
import { CustomerStateService } from './services/customer.state.service';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule
  ],
  declarations: [CustomersContainerComponent, CustomersListComponent, CustomersDetailsComponent],
  providers: [CustomersResolverService,
    CustomerStateService]
})
export class CustomersModule { }
