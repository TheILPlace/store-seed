import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { HttpService } from './services/http.service';

// routing
import { CoreRoutingModule } from './core-routing.module';

// services
import { ConfigService } from './services/config.service';
import { CacheService } from './services/cache.service';

import { environment } from '../../../environments/environment';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';
import { UiStateService } from './state/ui.state.service';




export function ConfigLoader(configService: ConfigService) {
  // Note: this factory need to return a function (that return a promise)
  console.log('before load config');
  return () => configService.load(environment.configFile);
}

@NgModule({
  imports: [
    CommonModule,HttpClientModule,
    CoreRoutingModule
  ],
  declarations: [],
  providers: [HttpService, ConfigService, CacheService,
    UiStateService,

  {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService],
            multi: true
        }
        
        ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}

