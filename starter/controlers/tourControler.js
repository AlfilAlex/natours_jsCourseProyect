const fs = require('fs');

// Reading the data of the tours
const dataTours = JSON.parse(
    fs.readFileSync('./starter/dev-data/data/tours-simple.json')
);

/* -------------------------------------------------------------------------- */
//*                                 Controlers                                */
/* -------------------------------------------------------------------------- */

// Request chequers

// Checking if a id is valid (with param middleware)
// param middlewares: Only for that part of the whole app
exports.checkID = (request, response, next, val) => {
    if (val >= dataTours.length) {
        console.log(`Tour with id ${val} not found`);
        return response.status(404).json({
            status: 'fail',
            message: 'Not found selected trip',
        });
    }
    next();
};

// Check body middleware: id body contains the name and price
exports.checkBody = (request, response, next) => {
    console.log(request.body);
    const haveName = request.body.name;
    const havePrice = request.body.price;
    if (!haveName || !havePrice) {
        return response
            .status(400)
            .json({
                status: 'fail',
                message:
                    'Missing data: name or price were not provided',
            });
    }
    next();
};

/* -------------------------------------------------------------------------- */
//*                          Controlers declarations                          */
/* -------------------------------------------------------------------------- */

exports.getAllTours = (request, response) => {
    response.status(200).json({
        status: 'succes',
        time: request.requestTime,
        results: dataTours.length,
        data: { tours: dataTours },
    });
};

exports.getTourById = (request, response) => {
    const id = Number(request.params.id);
    const requestedTour = dataTours.find((tour) => tour.id === id);
    response
        .status(200)
        .json({ status: 'succes', data: { tour: requestedTour } });
};

exports.createTour = (request, response) => {
    const newId = dataTours[dataTours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, request.body);
    dataTours.push(newTour);

    // ! ADD CHECKING IF FILE WAS WRITEN SUCCESFULLY
    fs.writeFile(
        './starter/dev-data/data/tours-simple.json',
        JSON.stringify(dataTours), // converts list list into JSON
        (err) => {
            response.status(201).json({
                status: 'succes',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

exports.patchTour = (request, response) => {
    const id = Number(request.params.id);
    response.status(200).json({
        status: 'succes',
        data: {
            message: 'Updated ',
            tour: request.body,
        },
    });
};

exports.deleteTour = (request, response) => {
    const id = Number(request.params.id);
    response.status(204).json({
        status: 'succes',
        data: null,
    });
};
