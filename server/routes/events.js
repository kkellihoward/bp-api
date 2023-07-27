import express from 'express';
import {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
} from '../controllers/eventController.js';

const eventRoutes = express.Router();

// GET all events
eventRoutes.get('/', getEvents);

// GET a single event
eventRoutes.get('/:id', getEvent);

// POST a new event
eventRoutes.post('/', createEvent);

// DELETE an event
eventRoutes.delete('/:id', deleteEvent);

// UPDATE an event
eventRoutes.patch('/:id', updateEvent);

export default eventRoutes;
