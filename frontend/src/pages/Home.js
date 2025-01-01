import {useEffect} from 'react';
import { useEventContext } from '../hooks/useEventContext';
import {useAuthContext} from '../hooks/useAuthContext';

// components
import EventDetails from '../components/EventDetails';
import EventForm from '../components/EventForm';

const Home = () => {
    // const [events, setEvents] = useState(null);
    const {events, dispatch} = useEventContext();
    const {user} = useAuthContext();
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch('/api/events', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }); // production should point to correct endpoint. see package.json for proxy param
            const json = await response.json();
            if (response.ok) {
                // setEvents(json);
                dispatch({type: 'SET_EVENTS', payload: json})
            }
        }
        if (user) {
            fetchEvents();
        }
    }, [dispatch, user]);

    return (
        <div className='home'>
            <div className='events'>
                {events && events.map((event) => (
                    <EventDetails key={event._id} event={event} />
                ))}
            </div>
            <div className="">
                <EventForm />
            </div>
        </div>
    );
}

export default Home;