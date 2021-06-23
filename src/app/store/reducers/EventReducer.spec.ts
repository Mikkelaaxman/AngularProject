declare var require: any;
var deepFreeze = require('deep-freeze');
import { eventsReducer, events } from './../reducers/EventReducer';
import * as types from './../actions/EventActions';
import { Event } from 'src/app/entities/Event';

const initEvent = { id: " ", event: "Test Event", location: "Test Location", fromDate: new Date(), toDate: new Date(), description: "This event is a test", status: "test" } as Event;
const newEvent = initEvent;
newEvent.event = "SECOND TEST EVENT"

describe('events reducer', () => {
    it('should return the initial state', () => {
        expect(eventsReducer(undefined, {})).toEqual({ isPinned: initEvent, events: events });
    });

    it('Change Pinned Event', () => {


        const oldState = { isPinned: initEvent, events: events };
        const action = { type: types.EventActions.SET_PINNED, payload: newEvent };

        deepFreeze(oldState);

        const result = eventsReducer(oldState, action);

        expect(result).toEqual({ isPinned: newEvent, events: events });
    });

    it('Add a new event to empty events array', () => {
        const oldState = { isPinned: initEvent, events: [] }

        deepFreeze(oldState);

        const actionObj = { type: types.EventActions.ADD_EVENT, payload: newEvent };

        // Act
        const result = eventsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.events).toHaveSize(oldState.events.length + 1);
        expect(result.events[result.events.length - 1]).toEqual(newEvent);
    });

    it('Add a new event to non-empty events array', () => {
        // Arrange, Act, Assert

        //Arrange
        const oldState = { isPinned: initEvent, events: events };

        deepFreeze(oldState);

        const actionObj = { type: types.EventActions.ADD_EVENT, payload: newEvent };

        // Act
        const result = eventsReducer(oldState, actionObj);

        // Assert (expect)
        expect(result.events).toHaveSize(oldState.events.length + 1);
        expect(result.events[result.events.length - 1]).toEqual(newEvent);
        // console.log(result.events);
    });

    it('update a event in the events array', () => {
        const oldState = { isPinned: initEvent, events: events }

        deepFreeze(oldState);

        const actionObj = { type: types.EventActions.UPDATE_EVENT, payload: newEvent };

        // Act
        const result = eventsReducer(oldState, actionObj);
        const event = result.events.find(event => event.id === newEvent.id);

        // Assert (expect)
        expect(event.event).toEqual("SECOND TEST EVENT");
    });

});
