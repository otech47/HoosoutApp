module.exports = {
	setGroupConcatMaxLen: "SET group_concat_max_len = 100000",
	users: "SELECT u.id, username, password, facebook_id, twitter, first_name, last_name, email, type, i.image_url " + 
	"FROM users AS u " + 
	"INNER JOIN images AS i ON u.image_id = i.id " +
	"WHERE active = 1",
	events: "SELECT e.id, event_name, establishment_id, datetime_start, datetime_end, i.image_url, est.latitude, est.longitude, est.address, e.facebook_url " +
	"FROM events AS e " +
	"INNER JOIN images AS i ON e.image_id = i.id " +
	"INNER JOIN establishments AS est ON e.establishment_id = est.id " +
	"WHERE active = 1 AND datetime_end >= CURDATE()",
	establishments: "SELECT est.id, establishment_name, latitude, longitude, address, owner_id, i.image_url, u.username AS owner_name, u.email AS owner_email " +
	"FROM establishments AS est " +
	"INNER JOIN images AS i ON est.image_id = i.id " +
	"INNER JOIN users AS u ON est.owner_id = u.id " +
	"WHERE active = 1"
}