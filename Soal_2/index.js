const profiles = require("./profile_list.json");

/**
 * Get full year from a valid date
 * @param {String} date
 * @output Integer
 */
const getYear = (date) => new Date(date).getFullYear();

/**
 * Get all article from users then transform it to One dimensional Array
 * @param {Array} users
 * @output Array
 */
const getAllArticles = (users) => users.map((user) => user["articles:"]).flat();

/**
 * Get all users who doesn't have phone number
 * @param {Array} users
 * @output Array
 */
const getUserWithNoPhoneNumber = (users) => {
	return users.filter((user) => user.profile.phones.length === 0);
};

/**
 * Get all users who have published an articles
 * @param {Array} users
 * @output Array
 */
const getUserWithArticles = (users) => {
	return users.filter((user) => user["articles:"].length > 0);
};

/**
 * Search all user with given name
 * @param {Array} users
 * @param {String} partialName
 * @output Array
 */
const getUserWithpartialName = (users, partialName = "annis") => {
	return users.filter((user) =>
		user.profile.full_name.toLowerCase().includes(partialName.toLowerCase())
	);
};

/**
 * Get all articles at specific year
 * @param {Array} users
 * @param {Integer} publishedAt
 * @output Array
 */
const getUserWithArticlesOnYear = (users, publishedAt = 2020) => {
	return users.filter((user) =>
		user["articles:"].some(
			(article) => getYear(article.published_at) === publishedAt
		)
	);
};

/**
 * Get all users who are born on a specific year
 * @param {Array} users
 * @param {Integer} bornAt
 * @output Array
 */
const getUserWhoBornAt = (users, bornAt = 1987) => {
	return users.filter((user) => getYear(user.profile.birthday) === bornAt);
};

/**
 * Search articles with given title parameter
 * @param {Array} users
 * @param {String} partialTitle
 * @output Array
 */
const getUserArticleWithPartialTitle = (users, partialTitle = "tips") => {
	let allArticles = getAllArticles(users);
	return allArticles.filter((article) =>
		article.title.toLowerCase().includes(partialTitle.toLowerCase())
	);
};

/**
 * Search articles prior to certain date
 *
 * get all article then compare the key "published_at" against "priorToDate"
 *
 * @param {Array} users
 * @param {String} priorToDate
 * @output Array
 */
const getArticlesPriorToDate = (users, priorToDate = "2019-08-01") => {
	let allArticles = getAllArticles(users);
	return allArticles.filter((article) => {
		let earlierDate = new Date(article.published_at);
		priorToDate = new Date(priorToDate);
		return earlierDate < priorToDate;
	});
};

const tasks = {
	"users who doesn't have any phone numbers": getUserWithNoPhoneNumber(
		profiles
	),
	"users who have articles": getUserWithArticles(profiles),
	"users who have 'annis' on their name": getUserWithpartialName(
		profiles,
		"annis"
	),
	"users who have articles on year 2020": getUserWithArticlesOnYear(
		profiles,
		2020
	),
	"users who are born at 1987": getUserWhoBornAt(profiles, 1987),
	"users articles that contain 'tips' on the title": getUserArticleWithPartialTitle(
		profiles,
		"tips"
	),
	"users articles published before August 2019": getArticlesPriorToDate(
		profiles,
		"2019-08-01"
	),
};

console.log(tasks);
