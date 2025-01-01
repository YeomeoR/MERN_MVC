const Event = require('../models/eventModel');
const mongoose = require('mongoose');

// get all events
const getAllEvents = async (req, res) => {
    const user_id = req.user._id;
    const events = await Event.find({user_id}).sort({createdAt: -1}); // only find docs for this logged in user
    if (events) {
        res.status(200).json(events);
    } else {
        return res.status(404).json({ message: 'No events found' }); 
        
    }
};

// get a single event
const getSingleEvent = async (req, res) => {
    const {id} = req.params;
    // console.log('req.params', req.params, id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Event not found' });
    }
    const event = await Event.findById(id);
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    } 
    res.status(200).json(event);
};

// create a new event
const createEvent = async (req, res) => {

    const { name, description, sets, reps, weight } = req.body;

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!sets) {
        emptyFields.push('sets')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all of the fields', emptyFields})
    }

    try {
        const user_id = req.user._id;
        const event = await Event.create({ name, description, sets, reps, user_id });
        res.status(201).json(event);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// update a event
const updateEvent = async (req, res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Event does not exist' });
    }
    const event = await Event.findByIdAndUpdate({_id: id}, { ...req.body})
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
};

// delete a event 
const deleteEvent = async (req, res) => {
    const {id} = req.params; 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Event does not exist' });
    }
    const event = await Event.findOneAndDelete({_id: id});
    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);

   
};


module.exports = {
    getAllEvents,
    getSingleEvent,
    createEvent,
    updateEvent,
    deleteEvent
};