import {useState} from "react";
import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from "../hooks/useAuthContext";

const EventForm = () => {
    const {dispatch} = useEventContext();
    const {user} = useAuthContext();
    
    const [name, setName] = useState('');
    const [venue, setVenue] = useState('');
    const [times, setTimes] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to use this')
            return;
        }
        const event = {name, venue, times, description}

        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        console.log('response', response)
        const json = await response.json();

        if (!response.ok) {
            console.log('error', json.error)
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setVenue('')
            setTimes('')
            setDescription('')
            setError(null);
            console.log('new event added', json)
            dispatch({type: 'CREATE_EVENT', payload: json})
            setEmptyFields([])
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a new event</h3>
            <label>Event Name:</label>
            <input 
                type="text" 
                onChange={(e) => {setName(e.target.value)}}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
                />
            <label>Event Description:</label>
            <input 
                type="text" 
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                
                />
            <label>Event Venue:</label>
            <input 
                type="text" 
                onChange={(e) => {setVenue(e.target.value)}}
                value={venue}
                className={emptyFields.includes('venue') ? 'error' : ''}
                
                />
            <label>Event Times:</label>
            <input 
                type="text" 
                onChange={(e) => {setTimes(e.target.value)}}
                value={times}
                className={emptyFields.includes('times') ? 'error' : ''}

            />
            <button>Add Event</button>
            {error && 
            <div className="error">{error}</div>}
        </form>
    )

}

export default EventForm;
