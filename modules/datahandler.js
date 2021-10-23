const pg = require("pg"); // må evt ha riktig til den type databse du har
const dbCredentials = process.env.DATABASE_URL || require("../localenv").credentials; // denne må stemme til localenv.js infoen din database url evt

class StorageHandler {

    constructor(credentials) {
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    async addViewCount(userInfo, returnNumber) {
        const client = new pg.Client(this.credentials); // pass på at denne stemmer med variabelen over
        let results = false;

        console.log(userInfo);

        // evt kan du gjøre noe med user info

        let viewCount = null;
        try {
            await client.connect();

            await client.query(`
                INSERT INTO userInfo
                VALUES ($1);
            `,[userInfo]);

            results = await client.query(`
                SELECT viewCount
                FROM viewCountTable`);
            // her må du oppdatere variabelen slik at den blir viewCount fra databasen
            // gjør slik at results = viewCount
            results = results.rows[0].viewcount;
            results++

            if (returnNumber === true) {
                // her oppdaterer du viewCount variabelen slik at den blir viewCount antallet
                viewCount = results;//
            }

            await client.query(`
            UPDATE viewCountTable
            SET viewCount = $1`, [results]);

            results = true;

        } catch (err) {
            results = false;
            client.end();
            console.log(err);
        }

        client.end();

        return { "status": results, "viewCount": viewCount };
    }
    async getAllVisits() {
        const client = new pg.Client(this.credentials); // pass på at denne stemmer med variabelen over
        let results = false;

        // evt kan du gjøre noe med user info

        let allVisits = [];
        try {
            await client.connect();
            
            allVisits = await client.query(`
                SELECT *
                FROM userInfo`);
            // her må du oppdatere variabelen slik at den blir viewCount fra databasen
            // gjør slik at results = viewCount
            // results = results.rows[0].viewcount;
            allVisits = allVisits.rows;

            results = true;
        } 
        catch (err) {
            results = false;
            client.end();
            console.log(err);
        }

        client.end();

        return { "status": results, "allVisits": allVisits };
    }
}

module.exports = new StorageHandler(dbCredentials);