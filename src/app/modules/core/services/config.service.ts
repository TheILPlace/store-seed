
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../../shared/models/configuration';
import { CacheService } from './cache.service';
import { of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

 //declare var __webpack_require__: any;

 
@Injectable()
export class ConfigService {
   private config: Configuration;
   constructor(private http: HttpClient, private cacheService: CacheService) {}



  load(url: string) {
    return new Promise((resolve) => {
      this.http.get<Configuration>(url).pipe(
        switchMap(config => {
          this.config = config;
           console.log('finished loading config');


           
           //__webpack_require__.p =  '/achilottan/';

           
          //return this.cacheService.loadCache(config);
          return of(true);

        }))
        .subscribe(() => {
            console.log('finished loading ');
            resolve();
        });
    });

        }
getConfiguration(): Configuration {

    return this.config;
  }
}