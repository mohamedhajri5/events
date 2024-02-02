// routes/hello.js
const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter events by type (all, physical, virtual)
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get("/events", async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type) {
      query.type = type.toLowerCase();
    }
    const events = await Event.find(query);
    return res.status(200).json({ length: events.length, events });
  } catch (error) {
    return res.status(500).json({ error: "Error getting events." });
  }
});

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Event created successfully
 */

router.post("/events", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    return res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating event." });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *       '404':
 *         description: Event not found
 */
router.put("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }
    return res.json(updatedEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating event." });
  }
});

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 */
router.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }
    return res.json({ message: "Event deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting event." });
  }
});


/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Event found successfully
 *       '404':
 *         description: Event not found
 */
router.get("/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    return res.json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error getting event." });
  }
});

module.exports = router;


module.exports = router;
