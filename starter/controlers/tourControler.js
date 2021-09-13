'use strict';

const Tour = require('./../models/tourModel.js');
const APIFeatures = require('./../utils/apiFeatures.js');

/* -------------------------------------------------------------------------- */
//*                          Controlers declarations                          */
/* -------------------------------------------------------------------------- */

exports.aliasTopTour = async (request, response, next) => {
    request.query.limit = '5';
    request.query.sort = '-ratingsAverage,-price';
    request.query.fields =
        'price,name,ratingsAverage,summary,difficulty';
    next();
};

exports.getAllTours = async (request, response) => {
    try {
        // // Create de Query obj
        // const queryObj = { ...request.query };
        // const excludeFields = ['page', 'sort', 'limit', 'fields'];
        // excludeFields.forEach((el) => delete queryObj[el]);

        // // Advanced query with gte and lte "STRINGIFY"
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(
        //     /\b(gte|gt|lte|lt)\b/g,
        //     (match) => `$${match}`
        // );

        // // Find return a query object
        // let query = Tour.find(JSON.parse(queryStr));

        // // Sorting
        // if (request.query.sort) {
        //     const sortBy = request.query.sort.split(',').join(' ');
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort('-createdAt');
        // }

        // // Field limiting
        // if (request.query.fields) {
        //     const fields = request.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else {
        //     query = query.select('-__v');
        // }

        // // Pagination
        // // skip: number of results skiped before quering data
        // // limit: number of results
        // const page = request.query.page * 1 || 1;
        // const limit = request.query.limit * 1 || 100;
        // const skipResults = (page - 1) * limit;

        // query = query.skip(skipResults).limit(limit);

        // if (request.query.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skipedResults >= numTours) {
        //         throw new Error('This pages does not exist');
        //     }
        // }

        // Execution and sending of the query object
        const features = new APIFeatures(Tour.find(), request.query)
            // const features = new APIFeatures(1, 2)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const tours = await features.query;
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

exports.getTourStats = async (request, response) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } },
            },
            {
                $group: {
                    _id: '$difficulty', // new id
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                },
            },
            {
                $sort: { avgPrice: 1 },
            },
        ]);

        response.status(200).json({
            status: 'succes',
            data: {
                stats: stats,
            },
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getMontlyPlan = async (request, response) => {
    try {
        const year = request.params.year * 1;

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates',
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTours: { $sum: 1 },
                    tours: { $push: '$name' },
                },
            },
            {
                $addFields: { month: '$_id' },
            },
            {
                $project: {
                    _id: 0,
                },
            },
            {
                $sort: {
                    numTourStarts: 1,
                },
            },
            // {
            //     $limit: 6,
            // },
        ]);

        response.status(200).json({
            status: 'succes',
            data: {
                plan: plan,
            },
        });
    } catch (err) {
        response.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
