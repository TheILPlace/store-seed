import { RouterStateSnapshot, Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { CustomerStoreService } from './customer.store.service';

@Injectable()
export class CustomersResolverService implements Resolve<boolean> {
    constructor(private customerStoreService: CustomerStoreService) { }
    // note: change to Guard
    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {



        this.customerStoreService.loadCustomers();
        // wait for the loading process to finish, and then release the
        // user to the route.
        return this.customerStoreService.select(state => state.customersLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );


    }
}
