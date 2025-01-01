const express = require('express');
const { 
    createEvent, 
    getSingleEvent, 
    getAllEvents, 
    updateEvent, 
    deleteEvent 
} = require('../controllers/eventController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();
router.use(requireAuth); // protect all following routes

// this is to get all events
router.get('/', getAllEvents);

// this is to get a single event
router.get('/:id', getSingleEvent);

// this is to create a new event
router.post('/',createEvent )

// this is to update a event
router.patch('/:id', updateEvent);

// this is to delete a event
router.delete('/:id', deleteEvent);

module.exports = router;