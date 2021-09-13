const express = require('express');
const router = express.Router();
const tourControler = require('./../controlers/tourControler.js');

// router.param('id', tourControler.checkID);

// - - - - - - - - - - - -
// * Route: /api/v1/tours
// - - - - - - - - - - - -

router.route('/tour-stats').get(tourControler.getTourStats);

router.route('/montly-plan/:year').get(tourControler.getMontlyPlan);

router
    .route('/top-5-cheap')
    .get(tourControler.aliasTopTour, tourControler.getAllTours);

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
