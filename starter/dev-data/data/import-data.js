const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel.js');

dotenv.config({ path: './config.env' });
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection succesful');
    });

const tours = JSON.parse(
    fs.readFileSync(
        './starter/dev-data/data/tours-simple.json',
        'utf-8'
    )
);

// console.log(tours);

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data succefully loaded');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
};

// if (process.argv[2] == '--import') {
//     importData();
// } else if (process.argv[2] == '--delete') {
//     deleteData();
// }

// deleteData();
importData();
