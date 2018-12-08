import { Observable, BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import * as deepFreeze from 'deep-freeze-strict';
import { environment } from 'src/environments/environment';

export class StoreBase<T> {
    private _store: BehaviorSubject<T>;
    private _storeValue: T;

    protected constructor(initialState: T) {
        this._store = new BehaviorSubject(initialState);
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


    setState2(newStateFn: (state: Readonly<T>) => T) {
        const prevState = this._storeValue;
        this._storeValue = !environment.production ? deepFreeze(newStateFn(this._storeValue)) : newStateFn(this._storeValue);

        if (prevState === this._storeValue) {
            console.log('new new state created !')
        }


        this.dispatch(this._storeValue);
    }


    setState(state: Partial<T>) {
        const prevState = this._storeValue;

        let newState = Object.assign({}, prevState, state);
        this._storeValue = !environment.production ? deepFreeze(newState) : newState;

        // if (prevState === this._storeValue) {
        //     console.log('new new state created !')
        // }


        this.dispatch(this._storeValue);
    }

    private dispatch(state: T) {
        this._store.next(state);

    }

    private get store$() {
        return this._store.asObservable();
    }
}