const postgres = require('postgres')
const secrets = require('./secrets')
const logger = require('../logger')

const user = secrets.getUser();
const pw = secrets.getPassword();

var sql;
if (process.env.DB_CONNECTION_STRING) {
    sql = postgres(process.ENV.DB_CONNECTION_STRING);
} else {
    sql = postgres({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: user,
        password: pw,
        database: 'UnderStance',
    });
}

async function getQuestions() {
    try {
        const rows = await sql`SELECT * FROM "Issue"`
        return rows;
    } catch (err) {
        logger.error(err.stack);
        throw err;
    }
}

async function getQuestionWithID(id) {
    if (!isNaN(id)) {
        const val = parseInt(id);
        try {
            const rows = await sql`SELECT * FROM "Issue" WHERE "IssueID" = ${val}`
            return rows;
        } catch (err) {
            logger.error(err.stack);
            throw err;
        }
    } else {
        throw new Error("Invalid Argument");
    }
}

async function getStances() {
    try {
        const rows = await sql`SELECT * FROM "Stance"`
        return rows;
    } catch (err) {
        logger.error(err.stack);
        throw err;
    }
}

async function getStancesFiltered(StanceID, IssueID, PartyID) {
    if (isNaN(StanceID) || isNaN(IssueID) || isNaN(PartyID)) {
        throw new Error("Invalid Argument");
    }
    if (StanceID != null) { StanceID = parseInt(StanceID); }
    if (IssueID != null) { IssueID = parseInt(IssueID); }
    if (PartyID != null) { PartyID = parseInt(PartyID); }
    try {
        const rows = await sql
            `SELECT * FROM "Stance"
            WHERE (${ StanceID } IS NULL OR "StanceID" = ${ StanceID })
            AND (${ IssueID } IS NULL OR "IssueID" = ${ IssueID })
            AND (${ PartyID } IS NULL OR "PartyID" = ${ PartyID })`
        return rows;
    } catch (err) {
        logger.error(err.stack);
        throw err;
    }
}

async function getParties() {
    try {
        const rows = await sql`SELECT * FROM "Party"`
        return rows;
    } catch (err) {
        logger.error(err.stack);
        throw err;
    }
}

async function getPartyWithID(id) {
    if (!isNaN(id)) {
        const val = parseInt(id);
        try {
            const rows = await sql
                `SELECT * FROM "Party" WHERE "PartyID" = ${val}`
            return rows;
        } catch (err) {
            logger.error(err.stack);
            throw err;
        }
    } else {
        throw new Error("Invalid Argument");
    }
}

module.exports = {
  getStancesFiltered,
  getStances,
  getQuestionWithID,
  getQuestions,
  getParties,
  getPartyWithID,
};
