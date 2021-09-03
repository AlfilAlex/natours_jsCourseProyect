const express = require('express');
const router = express.Router();
const tourControler = require('./../controlers/tourControler.js');

// router.param('id', tourControler.checkID);

// - - - - - - - - - - - -
// * Route: /api/v1/tours
// - - - - - - - - - - - -

router
    .route('/')
    .get(tourControler.getAllTours)
    .post(tourControler.createTour);
router
    .route('/:id')
    .get(tourControler.getTourById)
    .patch(tourControler.patchTour)
    .delete(tourControler.deleteTour);

module.exports = router;
