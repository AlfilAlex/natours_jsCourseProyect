'use strict';

const Tour = require('./../models/tourModel.js');

/* -------------------------------------------------------------------------- */
//*                          Controlers declarations                          */
/* -------------------------------------------------------------------------- */

exports.getAllTours = async (request, response) => {
    try {
        const tours = await Tour.find();
        response.status(200).json({
            status: 'succes',
            results: { data: tours },
        });
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTourById = async (request, response) => {
    try {
        const tour = await Tour.findById(request.params.id);
        response.status(200).json({
            status: 'succes',
            data: tour,
        });
    } catch (err) {
        response.status(404).json({
            status: 'fail',
            message: err,
        });
    }
    const id = Number(request.params.id);
};

exports.createTour = async (request, response) => {
    try {
        const newTour = await Tour.create(request.body);
        response.status(201).json({
            status: 'succes',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.patchTour = async (request, response) => {
    try {
        const tour = await Tour.findByIdAndUpdate(
            request.params.id,
            request.body,
            {
                new: true,
                runValidators: true,
            }
        );
        response.status(200).json({
            status: 'succes',
            data: {
                tour: tour,
            },
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (request, response) => {
    try {
        await Tour.findByIdAndDelete(request.params.id);
        response.status(204).json({
            status: 'succes',
            data: null,
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err,
        });
    }
    const id = Number(request.params.id);
    response.status(204).json({
        status: 'succes',
        data: null,
    });
};
