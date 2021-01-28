const inventoriesData = require("./inventory_list.json");

/**
 * Get all inventories by room
 * @param {Array} inventories
 * @param {String} roomName
 * @output Array
 */
const findByRoom = (inventories = [], roomName = "rajawali") => {
	if (typeof inventories !== "object" || inventories.length === 0) return [];

	return inventories.filter((inventory) => {
		return inventory.placement.name.toLowerCase() === roomName.toLowerCase();
	});
};

/**
 * Get all inventories by type
 * @param {Array} inventories
 * @param {String} typeName
 * @output Array
 */
const findByType = (inventories = [], typeName = "tableware") => {
	if (typeof inventories !== "object" || inventories.length === 0) return [];

	return inventories.filter((inventory) => {
		return inventory.type.toLowerCase() === typeName.toLowerCase();
	});
};

/**
 * Get all inventories by date purchased
 * @param {Array} inventories
 * @param {String} purchasedAt
 * @output Array
 */
const findByDatePurchased = (inventories = [], purchasedAt = "2020-01-16") => {
	if (typeof inventories !== "object" || inventories.length === 0) return [];

	return inventories.filter((inventory) => {
		let date = new Date(inventory.purchased_at);
		purchasedAt = new Date(purchasedAt);
		return date === purchasedAt;
	});
};

/**
 * Get all inventories by tag
 * @param {Array} inventories
 * @param {String} tagName
 * @output Array
 */
const findByTag = (inventories = [], tagName = "brown") => {
	if (typeof inventories !== "object" || inventories.length === 0) return [];

	return inventories.filter((inventory) => {
		return inventory.tags.includes(tagName.toLowerCase());
	});
};

const tasks = {
	"Find items in meeting room": findByRoom(inventoriesData, "meeting room"),
	"Find all electronic devices": findByType(inventoriesData, "electronic"),
	"Find all furnitures": findByType(inventoriesData, "furniture"),
	"Find all items was purchased at 16 Januari 2020": findByDatePurchased(
		inventoriesData,
		"1970-01-19"
	),
	"Find all items with brown color": findByTag(inventoriesData, "brown"),
};

console.log(tasks);
