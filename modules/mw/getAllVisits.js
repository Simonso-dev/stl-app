const database = require("../datahandler");

async function getAllVisits() {
    try {
        const resp = await database.getAllVisits();
        return resp;
    } catch (error) {
        console.error(error);
    }
}

module.exports.getAllVisits = getAllVisits;