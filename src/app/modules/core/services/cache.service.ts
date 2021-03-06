import { Injectable } from '@angular/core';
import { Configuration } from '../../../shared/models/configuration';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http'
import { Logger } from '../utilities/logger';

@Injectable()
export class CacheService {
    private cacheObject: any;

    constructor(private http: HttpClient) { }

    // we need the configuration, but cannot inject the 
    // configService

    loadCache(config: Configuration): Observable<boolean> {
        return Observable.create(observer => {
            // load the cache, or whatever we want
            // we cannot use the httpService yet in this APP_INITIALIZERS
            // so we use the basic http servie by angular
            this.http.get<any>(config.webApiBaseUrl + '/api/cache')
                .subscribe((data: any) => {
                    Logger.writeLog('cache loaded');

                });
            // we need to return an observable
            observer.next(true);
            observer.complete();

        });

    }


}