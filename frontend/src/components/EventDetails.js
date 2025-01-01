import { useEventContext } from "../hooks/useEventContext";
// date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from "../hooks/useAuthContext";

const EventDetails = ({event}) => {
    const {dispatch} = useEventContext();
    const {user} = useAuthContext();

    const handleClick = async () => {
        if (!user) { return }

        const response = await fetch('/api/events/' + event._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }

        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_Event', payload: json})
        }
    }
    return (
        <div className="event-details">
            <h4>{event.name}</h4>
            <p>{event.reps}</p>
            <p>{event.sets}</p>
            <p>{formatDistanceToNow(new Date(event.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default EventDetails;