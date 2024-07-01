const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find()
  .then(dronesFromDB => {
    console.log('Retreived Drones from DB: ', dronesFromDB);
    res.render('../views/drones/list.hbs', { drones : dronesFromDB}); 
  })
  .catch(error => {
    console.log('Error while fetching Drones From Database:', error);
    next(error);
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('/drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const { name, propellers, maxSpeed } = req.body;

  Drone.create({ name, propellers, maxSpeed })
  .then(() => res.redirect('/drones'))
  .catch(error => next(error));
});

router.get('/drones/:id/edit', async(req, res) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;

  try {
    const drone = await Drone.findById(id);
    if (!drone) {
      return res.status(404).send('Drone not found');
    }
    res.render('drones/update-form', { drone });
  } catch (err) {
    console.error('Error fetching drone for update:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/drones/:id/edit', async(req, res) => {
  // Iteration #4: Update the drone
  // ... your code here
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  try {
    const updatedDrone = await Drone.findByIdAndUpdate(
      id,
      { name, propellers, maxSpeed },
      { new: true } // This option returns the updated document
    );

    if (!updatedDrone) {
      return res.status(404).send('Drone not found');
    }

    res.redirect('/drones'); // Redirect to the drones list after update
  } catch (err) {
    console.error('Error updating drone:', err);
    res.render('drones/update-form', { drone: req.body, error: 'Failed to update drone. Please try again.' });
  }
});


router.post('/drones/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDrone = await Drone.findByIdAndDelete(id);
    if (!deletedDrone) {
      return res.status(404).send('Drone not found');
    }
    res.redirect('/drones'); // Redirect to the drones list after deletion
  } catch (err) {
    console.error('Error deleting drone:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
