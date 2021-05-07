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
    //Boolean draft senere
    events: Event[];
}

export class UserState {
    loggedInUser: User;
    token: string;
}
// export class EventState {
//     events: Event[];
// }

export class AppState {
    posts?: PostState;
    users?: UserState;

    // events?: EventState;
    events?: EventState;
}
export const rootReducer = combineReducers<AppState>({
    posts: postsReducer,
    users: usersReducer,
    // events: eventsReducer,
    events: eventsReducer
    // router: routerReducer
});