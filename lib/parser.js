var MongoClient = require('mongodb').MongoClient;

function custYearTotals(results) {
    console.log('YEAR' + ' | ' + 'CUSTOMER' + ' | ' + 'ORDER TOTAL');

    results.forEach(function(res) {
        console.log(res._id.year + ' | ' + res._id.customer + ' | ' + res.orderTotal.toFixed(2));
    });
}

function customerProfile(results) {
    console.log('ID' + ' | ' + 'NAME' + ' | ' + 'CONTACT' + ' | ' + 'ADDRESS' +
        ' | ' + 'CITY' + ' | ' + 'COUNTRY' + ' | ' + 'POSTAL CODE' +
        ' | ' + 'PHONE');
    results.forEach(function(result) {
       console.log(result.CustomerID + ' | ' + result.CompanyName + ' | ' +
        result.ContactName + ' | ' + result.Address + ' | ' + result.City +
        ' | ' + result.Country + ' | ' + result.PostalCode + ' | ' +
        result.Phone
       )
    });
}

var parser = {
    showCustYearTotals : function(uri) {
        var cursor;

        MongoClient.connect(uri, function(err, db) {
            "use strict";
            if(err) throw err;

            db.collection('northwind', {strict : true}, function(err, coll) {
                if (err) {db.close(); throw "no northwind collection found"}

                cursor = coll.aggregate([
                    {$unwind : "$orderItems"},
                    {$project: {
                        "orderId" : 1,
                        "orderDate" : 1,
                        "orderYear" : {$year : "$orderDate"},
                        "customer" : 1,
                        "orderItems.unitPrice" : 1,
                        "orderItems.quantity" : 1,
                        "orderItems.lineItemTotal" :
                        {$multiply : ["$orderItems.unitPrice", "$orderItems.quantity"]}
                    }},
                    {$group : {
                        _id : {
                            "year" : "$orderYear",
                            "customer" : "$customer.companyName"
                        },
                        "orderTotal" : {$sum : "$orderItems.lineItemTotal"}
                    }},
                    {$sort : {
                        "_id.customer" : 1, "_id.year" : 1
                    }}
                ], { cursor : {batchSize : 25}}
                );
                cursor.get(function(err, results) {
                    custYearTotals(results);
                    db.close();
                });

            });
        });
    },

    showCustomers : function(uri) {
        var cursor;

        MongoClient.connect(uri, function(err, db) {
            "use strict";
            if(err) throw err;

            db.collection('customers', {strict : true}, function(err, coll) {
                if (err) {db.close(); throw "no customers collection found"}

                cursor = coll.find({}).sort({CompanyName:1});
                cursor.toArray(function(err, result) {
                    customerProfile(result);
                    db.close();
                });

            });
        });
    }

};


module.exports = parser;