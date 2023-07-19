const Event = require('./eventModel');
const mongoose = require('mongoose');

// get all events
const getEvents = async (req, res) => {
    const event = await Event.find({}).sort({createdAt: -1});

    res.status(200).json(event);
}

// get a single event
const getEvent = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    const event = await Event.findById(id);

    if (!event) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    res.status(200).json(event);
}

// create a new event
const createEvent = async (req, res) => {
    const {title, host_id, invitee_ids, date} = req.body;

    const temp = await Event.findOne({title: title});

    if (temp)
    {
        res.status(400).json({error: "Event already exists"});
    }
    else
    {
        // add doc to db
        try {
            const event = await Event.create({title, host_id, invitee_ids, date});
            res.status(200).json(event);

        } catch (error) {
            res.status(400).json({error: "Event unable to be created"});
        }
    }
};

// delete an event
const deleteEvent = async (req, res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    const event = await Event.findOneAndDelete({_id: id});

    if (!event) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    res.status(200).json(event);
}

// update an event
// cannot be used to add invitees. this must be done via js "push" function
const updateEvent = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    const event = await Event.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!event) {
        return res.status(404).json({error: 'Event does not exist'});
    }

    res.status(200).json(event);
}

module.exports = {
    getEvent,
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent
};