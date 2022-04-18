import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { User } from '../user';
import * as UserActions from './user.actions';

export interface State extends AppState.State {
    users: UserState;
}

export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

export const getUserState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserState,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserState,
    state => state.currentUser
);

export const userReducer = createReducer(
    initialState,
    on(UserActions.maskUserName, (state): UserState => {
        return {
            ...state,
            maskUserName: !state.maskUserName
        };
    })
);
