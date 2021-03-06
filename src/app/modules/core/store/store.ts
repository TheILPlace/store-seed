import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { getStoresSnapshot, deepFreeze } from './store.utils';
import { Logger } from '../utilities/logger';
import { produce, setAutoFreeze } from "immer";

export const __stores__: { [storeName: string]: Store<any> } = {};
export let devtools = null;

export class Store<T> {
    private _store: BehaviorSubject<T>;
    private _storeValue: T;
    private _storeName: string;
   

    protected constructor(storeName: string, initialState: T) {
        this._store = new BehaviorSubject(initialState);
        this._storeValue = initialState;
        
        __stores__[storeName] = this;
        this._storeName = storeName;

        if ( !environment.production && !devtools && window['__REDUX_DEVTOOLS_EXTENSION__']) {
            // this.devtools = window['devToolsExtension'].connect();
            devtools = window['__REDUX_DEVTOOLS_EXTENSION__'].connect();
        }

        setAutoFreeze(false);

        
    }


    getSnapshot(): T {
        return this._store.getValue();
    }


    private _select<R>(project: (store: T) => R): Observable<R> {
        return this._store.pipe(
            map(project),
            distinctUntilChanged()
        );
    }


    select<R>(project?: (store: T) => R): Observable<R>;
    select(): Observable<T>;
    select<R>(project?: (store: T) => R): Observable<R | T> {
        let state = project ? project : state => state;
        return this._select(state);
    }

    // setState(nextState: T): void {
    //     this._store$.next(nextState);
    // }

    setState(
        action: string,
        newStateFn: (state: Readonly<T>) => T | void,
        useImmer: boolean = false
      ) {
        const prevState = this._storeValue;
        const tempState = useImmer
          ? produce(prevState, newStateFn)
          : newStateFn(this._storeValue);

          this._storeValue = !environment.production
          ? deepFreeze(tempState)
          : tempState;
    
        if (prevState === this._storeValue) {
          Logger.writeLog("new state not created!", this._storeName);
        }
    
        this.dispatch(action, this._storeValue, this._storeValue);
      }

      
    updateState(action: string, state: Partial<T>) {
        const prevState = this._storeValue;

        const newState = Object.assign({}, prevState, state);
        this._storeValue = !environment.production ? deepFreeze(newState) : newState;

        // if (prevState === this._storeValue) {
        //     console.log('new new state created !')
        // }


        this.dispatch(action,state, this._storeValue);
    }

    private dispatch(action: string, payload: any, state: T) {
        this._store.next(state);
        if (devtools) {
            devtools.send({type: action, payload: payload}, getStoresSnapshot(__stores__));
        }
    }

    private get store$() {
        return this._store.asObservable();
    }
}