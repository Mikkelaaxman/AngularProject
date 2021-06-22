import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import {Event} from '../entities/Event'
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { postsReducer } from './reducers/PostReducer';
import { usersReducer } from './reducers/UserReducer';
import { eventsReducer } from './reducers/EventReducer';

export class PostState {
    isHappy: boolean;
    posts: Post[];
}

export class EventState {
    //isDraft: boolean;
    //Store sender videre til reducer, som sender tilbage igen så store opdaterer state
    isPinned: Event;  //bare pinned?, ikke en bool
    events: Event[];
}

export class UserState {
    loggedInUser: User;
    token: string;
}

export class AppState {
    posts?: PostState;
    users?: UserState;
    events?: EventState;
}

export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    users: usersReducer,
    events: eventsReducer
    // router: routerReducer
});