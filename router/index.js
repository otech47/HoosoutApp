module.exports = function (app) {

	app.use('/users', require('./routes/users'));
	app.use('/events', require('./routes/events'));
	app.use('/establishments', require('./routes/establishments'));
	app.use('/images', require('./routes/images'));
	app.use('/messages', require('./routes/messages'));

}
