import express from 'express';
import {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
} from '../controllers/events.js';

const eventRoutes = express.Router();

// GET all events
eventRoutes.get('/getEvents', getEvents);

// GET a single event
eventRoutes.get('/getEvent/:id', getEvent);

// POST a new event
eventRoutes.post('/createEvent', createEvent);

// DELETE an event
eventRoutes.delete('/deleteEvent/:id', deleteEvent);

// UPDATE an event
eventRoutes.patch('/updateEvent/:id', updateEvent);

export default eventRoutes;
