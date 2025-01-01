import {createContext, useReducer} from 'react';

export const EventContext = createContext();

export const eventReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return {
                ...state, events: action.payload
            };
        case 'CREATE_EVENT':
            return {
                events: [action.payload, ...state.events]
            };
        case 'DELETE_EVENT':
            return {
                events: state.events.filter((event) => 
                    event._id !== action.payload._id
                )
            };
        default:
            return state;
    }
}

export const EventContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(eventReducer, {
        events: null
    });

    return (
        <EventContext.Provider value={{...state, dispatch}}>
            {children}
        </EventContext.Provider>
    );
}