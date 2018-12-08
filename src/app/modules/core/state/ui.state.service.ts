import { Injectable } from '@angular/core';
import { StoreBase } from './state.base';

export class UiState2 {
    editMode: boolean;
    

}

const INITIAL_UI_STATE2: UiState2 = {
    editMode: false

};


@Injectable()
export class UiStateService extends StoreBase<UiState2> {
    constructor() {
        super(INITIAL_UI_STATE2)
    }
}