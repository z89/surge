var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Global variables
const secretKey = "this is a passphrase"; // Used for salting hash ** KEEP SECRET **
let authed = false; // Boolean used to define is user is authenticated

// Default /stocks URL
router.get('/', function(req, res, next) {
    res.json({
        "error": true,
        "message": "Request on /stocks must include symbol as path parameter, or alternatively you can hit /stocks/symbols to get all symbols"
    });
});

// Show all stocks () via /stocks/symbols URL w/ optional 'industry' query (eg. /stocks/symbols?industry=info)
router.get("/symbols", function(req, res, next) {
    // Check length of queries in URL
    if(Object.keys(req.query).length > 0) {
        let queries = []; // Create a new array for queries

        // For each query detected assign correct the query to array and detect anomalies
        for (const [i, value] of Object.keys(req.query).entries()) {
            value === 'industry' ? queries[0] = value : null; // If query 'industry' is detected assign to first value of array

            // If query doesn't equal null or 'industry, an extra query is detected
            value !== 'undefined' && value !== 'industry' ? detectExtraQuery = true : detectExtraQuery = false;
        }
        
        // If query is 'industry' with no extra queries
        if(queries[0] === 'industry' && detectExtraQuery === false) {
            // If to and from queries both contain a value
            if(req.query.industry.length > 0) {   
                // Get stocks that are like the 'industry' query
                req.db.from('stocks').distinct('name', 'symbol', 'industry').where('industry', 'like', '%' + req.query.industry + '%').then((rows) => {
                    if(rows.length === 0) {
                        res.status(404).json({
                            "error": true,
                            "message": "Industry sector not found"
                        });
                    } else {
                        res.status(200).json(rows);
                    }
                })
                .catch((err) => {
                    // If query wasn't succesful
                    console.log(err);
                    res.json({
                        "error": true,
                        "nessage": "Error executing MySQL query"
                    });
                })
            } else {
                // If the 'industry' query doesn't contain a value throw error
                res.status(400).json({
                    "error": true,
                    "message": "Invalid query parameter: only 'industry' is permitted"
                });
            }
        // If 'industry' query hasn't been met but another query is detected
        } else if (detectExtraQuery === true) {
            res.status(400).json({
                "error": true,
                "message": "Invalid query parameter: only 'industry' is permitted"
            });
        }

    // If no queries are given
    } else {
        req.db.from('stocks').distinct('name', 'symbol', 'industry').then((rows) => {
            if(rows.length === 0) {
                res.status(404).json({
                    "error": true,
                    "message": "Industry sector not found"
                });
            } else {
                res.status(200).json(rows);
            }
        })
        .catch((err) => {
            // If query wasn't succesful
            console.log(err);
            res.status(500).json({
                "error": true,
                "nessage": "Error executing MySQL query"
            });
        });
    }
});

// Unauthenticated stock request via /stocks/{symbol} (eg. /stocks/AMNZ)
router.get("/:stockSymbol", function(req, res, next) {
    let queries = []; // Create a new array for queries

    // stock symbol URL parameter must contain capitalisation
    if(req.params.stockSymbol.toUpperCase() === req.params.stockSymbol) {
        // For each query detected assign correct the query to array and detect anomalies
        for (const [i, value] of Object.keys(req.query).entries()) {
            value === 'to' ? queries[0] = value : null; // If query 'to' is detected assign to first value of array
            value === 'from' ? queries[1] = value : null; // If query 'from' is detected assign to first value of array
        }

        // To match the assignment API:
        // Date error should only match if the query has a value, eg. AIG?from=A or AIG?to=A. Without value won't throw error eg. AIG?from= or AIG?to=
        // To throw date error on just having specific queries such as 'to' & 'from' (more clean than assignment spec), use the if statement below:
        // if((queries[0] === 'to' || queries[1] === 'from') {
        if((queries[0] === 'to' || queries[1] === 'from') && ((!(req.query.to === '') && !(req.query.to === undefined))||(!(req.query.from === '') && !(req.query.from === undefined)))) {
            res.status(400).json({
                "error": true,
                "message": "Date parameters only available on authenticated route /stocks/authed"
            });
        } else {
            // Get stock that equals the stockSymbol supplied in URL parameter
            req.db.from('stocks').select('*').where('symbol', '=', req.params.stockSymbol).then((rows) => {
                if(rows.length === 0) {
                    res.status(404).json({
                        "error": true,
                        "message": "No entry for symbol in stocks database"
                    });
                } else {
                    // Show only the first stock in rows
                    res.status(200).json(rows[0]);
                }
            })
            .catch((err) => {
                // If query wasn't succesful
                console.log(err);
                res.status(500).json({
                    "error": true,
                    "nessage": "Error executing MySQL query"
                });
            });
        } 
    
    // If stock symbol URL parameter doesn't contain capitalisation
    } else {
        res.status(400).json({
            "error": true,
            "message": "Stock symbol incorrect format - must be 1-5 capital letters"
        });
    }
});

// Check rquest header to validate JWT token
const authorize = (req, res, next) => {
    const authorization = req.headers.authorization; // Assign headers
    let token = null; // Initalize token

    // Retireve token
    if(authorization && authorization.split(" ").length == 2) {
        // Example Token: Bearer part1.part2.part3 - Split "Bearer" off the start of the token
        token = authorization.split(" ")[1];
    } else {
        // If headers don't have a correct length of 2
        res.status(403).json({"error": true, "message": "Authorization header not found"});
        authed = false;
        return
    }

    // Verify JWT token and check expiration date
    try {
        const decoded = jwt.verify(token ,secretKey); // Decoded JWT using secretKey

        // If the expiration of the token is earlier than the current time
        if(decoded.exp < Date.now()) {
            res.status(403).json({"error": true, "message": "Expired Token"});
            return
        }
        
        // Else if the expiration hasn't expired the user is authenticated
        authed = true;

    // Capture any errors that would count as an invalid token
    } catch (e) {
        authed = false;
        res.status(403).json({"error": true, "message": "Invalid token"});
    }
};


//  Authenticated stock request via /stocks/authed/{symbol} w/ optional date query (eg. /stocks/authed/AMZN?from=2020-03-15T00:00:00.000Z&to=2020-03-20T00:00:00.000Z)
router.get("/authed/:stockSymbol", function(req, res, next) {
    let detectExtraQuery = false; // Boolean used to detect extra queries

    // Check authorisation of JWT token in header & deal with error handling
    authorize(req, res, next);

    // If user is authenticated from authorize function
    if(authed) {
        // Check if stock symbol is capitalised
        if(req.params.stockSymbol.toUpperCase() === req.params.stockSymbol) {
            // Check length of queries in URL
            if(Object.keys(req.query).length > 0) {
                let queries = []; // Create a new array for queries

                // For each query detected assign correct the query to array and detect anomalies
                for (const [i, value] of Object.keys(req.query).entries()) {
                    value === 'to' ? queries[0] = value : null; // If query 'to' is detected assign to first value of array
                    value === 'from' ? queries[1] = value : null; // If query 'from' is detected assign to first value of array

                    // If query doesn't equal null, 'to' or 'from', an extra query is detected
                    value !== 'undefined' && value !== 'to' && value !== 'from' ? detectExtraQuery = true : detectExtraQuery = false;
                }
                
                // If queries are 'to' & 'from' with no extra queries
                if(queries[0] === 'to' && queries[1] === 'from' && detectExtraQuery === false) {
                    toDate = new Date(req.query.to); // Parse to query to ISO 8601 format
                    fromDate = new Date(req.query.from); // Parse to query to ISO 8601 format

                    // If to and from queries both contain a value
                    if(req.query.to.length > 0 && req.query.from.length > 0) {   
                        // Check if parse was succesful via Not a Number instead of date.parse                    
                        if (!isNaN(toDate) && !isNaN(fromDate)) {
                            // Get dates between to and from for particular stock
                            req.db.from('stocks').select('*').where('symbol', '=', req.params.stockSymbol).andWhereBetween('timestamp', [fromDate, toDate]).then((rows) => {
                                // If no data was found in the database
                                if(rows.length === 0) {
                                    res.status(404).json({
                                        "error": true,
                                        "message": "No entries available for query symbol for supplied date range"
                                    });
                                } else {
                                    res.status(200).json(rows);
                                }
                            })
                            .catch((err) => {
                                // If query wasn't succesful
                                console.log(err);
                                res.status(500).json({
                                    "error": true,
                                    "nessage": "Error executing MySQL query"
                                });
                            }); 
                        }
                        else {
                            // If parse wasn't succesful
                            res.status(400).json({
                                "error": true,
                                "message": "To & From dates cannot be parsed by Date.parse()"
                            });
                        }
                    } else {
                        // If both to and from don't contain a value throw error
                        res.status(400).json({
                            "error": true,
                            "message": "Parameters allowed are from and to, example: /stocks/authed/AAL?from=2020-03-15"
                        });
                    }

                // If queries are 'to' & not 'from' with no extra queries
                } else if(queries[0] === 'to' && detectExtraQuery === false) {
                    toDate = new Date(req.query.to); // Parse to query to ISO 8601 format

                    // If the to query contains a value
                    if(req.query.to.length > 0) {   
                        // Check if parse was succesful via Not a Number instead of date.parse                       
                        if (!isNaN(toDate)) {
                            // Get dates less than to for particular stock
                            req.db.from('stocks').select('*').where('symbol', '=', req.params.stockSymbol).andWhere('timestamp', '<', toDate).then((rows) => {
                                // If no data was found in the database
                                if(rows.length === 0) {
                                    res.status(404).json({
                                        "error": true,
                                        "message": "No entries available for query symbol for supplied date range"
                                    });
                                } else {
                                    res.status(200).json(rows);
                                }
                            })
                            .catch((err) => {
                                // If query wasn't succesful
                                console.log(err);
                                res.status(500).json({
                                    "error": true,
                                    "nessage": "Error executing MySQL query"
                                });
                            });  
                        }
                        else {
                            // If parse wasn't succesful
                            res.status(400).json({
                                "error": true,
                                "message": "To date cannot be parsed by Date.parse()"
                            });
                        }
                    } else {
                        // If both to and from don't contain a value throw error
                        res.status(400).json({
                            "error": true,
                            "message": "Parameters allowed are from and to, example: /stocks/authed/AAL?from=2020-03-15"
                        });
                    }

                // If queries are 'from' & not 'to' with no extra queries
                } else if(queries[1] === 'from' && detectExtraQuery === false) {
                    fromDate = new Date(req.query.from); // Parse to query to ISO 8601 format
                    
                    // If the from query contains a value
                    if(req.query.from.length > 0) {                        
                        // Check if parse was succesful via Not a Number instead of date.parse     
                        if (!isNaN(fromDate)) {
                            // Get dates more than from for particular stock
                            req.db.from('stocks').select('*').where('symbol', '=', req.params.stockSymbol).andWhere('timestamp', '>', fromDate).then((rows) => {
                                // If no data was found in the database
                                if(rows.length === 0) {
                                    res.status(404).json({
                                        "error": true,
                                        "message": "No entries available for query symbol for supplied date range"
                                    });
                                } else {
                                    res.status(200).json(rows);
                                }
                            })
                            .catch((err) => {
                                // If query wasn't succesful
                                console.log(err);
                                res.status(500).json({
                                    "error": true,
                                    "nessage": "Error executing MySQL query"
                                });
                            });
                        }
                        else {
                            // If parse wasn't succesful
                            res.status(400).json({
                                "error": true,
                                "message": "From date cannot be parsed by Date.parse()"
                            });
                        }
                    } else {
                        // If both to and from don't contain a value throw error
                        res.status(400).json({
                            "error": true,
                            "message": "Parameters allowed are from and to, example: /stocks/authed/AAL?from=2020-03-15"
                        });
                    }
                
                // If queries haven't been met but another query is detected
                } else if (detectExtraQuery === true) {
                    res.status(400).json({
                        "error": true,
                        "message": "Parameters allowed are from and to, example: /stocks/authed/AAL?from=2020-03-15"
                    });
                }

            // If not queries enter show first record of requested stock symbol
            } else {
                req.db.from('stocks').select('*').where('symbol', '=', req.params.stockSymbol).then((rows) => {
                    // If no data was found in the database
                    if(rows.length === 0) {
                        res.status(404).json({
                            "error": true,
                            "message": "No entry for symbol in stocks database"
                        });
                    } else {
                        res.status(200).json(rows[0]);
                    }
                })
                .catch((err) => {
                    // If query wasn't succesful
                    console.log(err);
                    res.status(500).json({
                        "error": true,
                        "nessage": "Error executing MySQL query"
                    });
                });
            }

        // If stock symbol is not capitalised
        } else {
            res.status(400).json({
                "error": true,
                "message": "Stock symbol incorrect format - must be 1-5 capital letters"
            });
        }
    }
});



module.exports = router;
