use Northwind

db.northwind.aggregate([

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
]).toArray()
