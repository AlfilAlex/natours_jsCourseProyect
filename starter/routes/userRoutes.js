const express = require('express');
const router = express.Router();
const userControler = require('./../controlers/userControler.js');

// - - - - - - - - - - -
// * Route: api/v1/users

router
    .route('/')
    .get(userControler.getAllUser)
    .post(userControler.createUser);
router
    .route('/:id')
    .get(userControler.getUser)
    .patch(userControler.updateUser)
    .delete(userControler.deleteUser);

module.exports = router;
