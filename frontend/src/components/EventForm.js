import {useState} from "react";
import { useEventContext } from '../hooks/useEventContext';
import { useAuthContext } from "../hooks/useAuthContext";

const EventForm = () => {
    const {dispatch} = useEventContext();
    const {user} = useAuthContext();
    
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to use this')
            return;
        }
        const event = {name, reps, sets, description}

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
            setReps('')
            setSets('')
            setDescription('')
            setError(null);
            console.log('new event added', json)
            dispatch({type: 'CREATE_Event', payload: json})
            setEmptyFields([])
        }
    }

    return (
        <form action="" className="create" onSubmit={handleSubmit}>
            <h3>Add a new event</h3>
            <label>Exercise Name</label>
            <input 
                type="text" 
                onChange={(e) => {setName(e.target.value)}}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
                />
            <label>Exercise Description</label>
            <input 
                type="text" 
                onChange={(e) => {setDescription(e.target.value)}}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
                
                />
            <label>Exercise Reps</label>
            <input 
                type="number" 
                onChange={(e) => {setReps(e.target.value)}}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
                
                />
            <label>Exercise sets</label>
            <input 
                type="number" 
                onChange={(e) => {setSets(e.target.value)}}
                value={sets}
                className={emptyFields.includes('sets') ? 'error' : ''}

            />
            <button>Add Event</button>
            {error && 
            <div className="error">{error}</div>}
        </form>
    )

}

export default EventForm;
