import { useAuthContext } from "./useAuthContext";
import { useEventContext } from "./useEventContext";


export const useLogout = () => {

    const {dispatch} = useAuthContext();
    const {dispatch: eventDispatch} = useEventContext();
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');
        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        eventDispatch({type: 'SET_EVENTS', payload: null})
    }

    return {logout}
}