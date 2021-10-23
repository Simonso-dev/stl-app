const database = require("../datahandler");

async function addViewCount(userInfo, returnNumber) {
    try {
        const resp = await database.addViewCount(userInfo, returnNumber);
        return resp;
    } catch (error) {
        console.error(error);
    }
}

module.exports.addViewCount = addViewCount;