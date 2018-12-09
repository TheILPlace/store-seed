import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { getStoresSnapshot, deepFreeze } from './store.utils';

export const __stores__: { [storeName: string]: Store<any> } = {};


export class Store<T> {
    private _store: BehaviorSubject<T>;
    private _storeValue: T;
    private devtools;

    protected constructor(storeName: string, initialState: T) {
        this._store = new BehaviorSubject(initialState);
        __stores__[storeName] = this;

        if ( !environment.production && !this.devtools && window['devToolsExtension']) {
            // this.devtools = window['devToolsExtension'].connect();

            this.devtools = window['__REDUX_DEVTOOLS_EXTENSION__'].connect();
        }

        //this.store$ = this._store.asObservable();
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




    setState(action: string, state: Partial<T>) {
        const prevState = this._storeValue;

        let newState = Object.assign({}, prevState, state);
        this._storeValue = !environment.production ? deepFreeze(newState) : newState;

        // if (prevState === this._storeValue) {
        //     console.log('new new state created !')
        // }


        this.dispatch(action,this._storeValue);
    }

    private dispatch(action: string, state: T) {
        this._store.next(state);
        if (this.devtools) {
            this.devtools.send(action, getStoresSnapshot(__stores__));
        }
    }

    private get store$() {
        return this._store.asObservable();
    }
}