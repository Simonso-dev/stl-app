const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = (process.env.PORT || 8080);
server.set('port', port);
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 1000000 }));
server.use(bodyParser.json({ limit: "5mb" }));

const addViewCount = require("./modules/mw/viewCount").addViewCount;
const getAllVisits = require("./modules/mw/getAllVisits").getAllVisits;

server.post("/addViewCount", async function (req, res) {
    try {
        const userInfo = req.body.userInfo;
        const returnNumber = req.body.returnNumber;

        const viewCountResp = await addViewCount(userInfo, returnNumber);

        if (viewCountResp.status === true) {

            res.status(200).json(viewCountResp).end();
        } else {
            res.status(403).json().end();
        }

    } catch (err) {
        console.log(err);
        res.status(403).json().end();
    }
});
server.post("/getAllVisits", async function (req, res) {
    try {

        const getAllvisitsRep = await getAllVisits();

        if (getAllvisitsRep.status === true) {

            res.status(200).json(getAllvisitsRep).end();
        } else {
            res.status(403).json().end();
        }

    } catch (err) {
        console.log(err);
        res.status(403).json().end();
    }
});

server.listen(server.get('port'), function () {
    console.log(
        `Server running on localhost:`,
        server.get('port')
    );
});