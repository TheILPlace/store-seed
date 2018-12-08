import { RouterStateSnapshot, Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { CustomerStateService } from './customer.state.service';

@Injectable()
export class CustomersResolverService implements Resolve<boolean> {
    constructor(private customerStateService: CustomerStateService) { }
    // note: change to Guard
    resolve(route: ActivatedRouteSnapshot): Observable<boolean> {



        this.customerStateService.loadCustomers();
        // wait for the loading process to finish, and then release the
        // user to the route.
        return this.customerStateService.select(state => state.customersLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );


    }
}
