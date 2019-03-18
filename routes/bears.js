const express = require('express');
const router = express.Router();
const Bear = require('../models/bear');
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/bear', { useNewUrlParser: true }).then(() => console.log('Conneting to mongoDB')).catch((err) => console.log(err.message));
mongoose
	.connect('mongodb+srv://greenlad:8564@greenlad@cluster0-jonki.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
	.then(() => console.log('Conneting to mongoDB'))
	.catch((err) => console.log(err.message));

//get verb for Bear
router.get('/api/bears', async (req, res) => {
	const bears = await Bear.find();

	res.json(bears);
});

//GetByID verb for bears
router.get('/api/bear/:id', async (req, res) => {
	const bear = await Bear.find({ _id: req.params.id });
	if (!bear.length) return res.status(404).send(`There is no Bear with the ID: ${req.params.id}`);
	res.json(bear);
});

//Getting bears by Bearname
router.get('/api/bears/name/:bear_name', async (req, res) => {
	const bear = await Bear.find({ name: req.params.bear_name });
	if (!bear.length) return res.status(404).send(`There is no Bear with the name: ${req.params.bear_name}`);
	res.json(bear);
});

//Getting bears by colour
router.get('/api/bears/colour/:bear_colour', async (req, res) => {
	const colours = req.params.bear_colour.split('&');
	const bear = await Bear.find({ colour: { $in: colours } });
	if (!bear.length) return res.status(404).send(`There is no Bear with the colour: ${req.params.bear_colour}`);
	res.json(bear);
});

//Getting bears by Location
router.get('/api/bears/location/:bear_location', async (req, res) => {
	const location = req.params.bear_location.split('&');
	const bear = await Bear.find({ location: { $in: location } });
	if (!bear.length) return res.status(404).send(`There is no Bear within the location: ${req.params.bear_location}`);
	res.json(bear);
});

//Getting bears by documenter
router.get('/api/bears/documenter/:bear_documenter', async (req, res) => {
	const documenter = req.params.bear_documenter.split('&');
	const bear = await Bear.find({ documenter: { $in: documenter } });
	if (!bear.length) return res.status(404).send(`No Bear has been documented by: ${req.params.bear_documenter}`);
	res.json(bear);
});

//Creating Bear to post to database
router.post('/api/bears/', async (req, res) => {
	const bear = new Bear({
		name: req.body.name,
		colour: req.body.colour,
		location: req.body.location,
		documenter: req.body.documenter,
	});
	try {
		const result = await bear.save();
		res.json(result);
	} catch (error) {
		console.log(error.message);
	}
});

//Updating bear
router.put('/api/bear/:id', async (req, res) => {
	const bearList = await Bear.find({ _id: req.params.id });
	const bear = bearList[0];
	if (!bearList.length) return res.status(404).send(`There is no Bear with the ID: ${req.params.id}`);
	const result = await Bear.findByIdAndUpdate(req.params.id, {
		$set: {
			name: req.body.name || bear.name,
			colour: req.body.colour || bear.colour,
			location: req.body.location || bear.location,
			documenter: req.body.documenter || bear.documenter,
			date_edited: Date.now(),
		},
  }, {new: true});
  res.send(result)
});

module.exports = router;
