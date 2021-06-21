import { tassign } from 'tassign';
import { EventState } from '../Store';
import { EventActions } from '../actions/EventActions';
import { Event } from 'src/app/entities/Event';


export const events = [];

const INITIAL_STATE: EventState = {events: events};

export function eventsReducer(state: EventState = INITIAL_STATE, action: any) {
 switch (action.type) {
    case EventActions.READ_EVENTS:
        return tassign(state, {events: action.payload});

    case EventActions.UPDATE_EVENT:
        // [{id:'1',...},{2},{3},{4},{5}]
        // [{1},{2},{3new},{4},{5}]
        //state.posts[2] = action.payload; // mutate the original array.
        const newArray = [...state.events]; // copy of the array.
        const index = state.events.findIndex(event => event.id === action.payload.id);
        newArray[index] = action.payload;
        return tassign(state, {events: newArray});

        
    case EventActions.ADD_EVENT:
        // add the action.payload (post) to the array of posts, but without mutating the array.
        // state.posts.push(action.payload);
        // return state;

        // return tassign(state, {posts: state.posts.concat(action.payload)});
        return tassign(state, {events: [...state.events, action.payload]});
        
    
    case EventActions.DELETE_EVENT:
        return tassign(state, {events: state.events.filter(event=>event.id!==action.payload)})

  //case EventActions.SET_HAPPY:
    // action.payload = true/false
    // state.isHappy = action.payload; // mutating the old state object.
    // return Object.assign({}, state, {isHappys: action.payload});

    // state.isHappy = action.payload;
    // return state;
    //return tassign(state, { isHappy: action.payload });

   default:
    return state;
}
}