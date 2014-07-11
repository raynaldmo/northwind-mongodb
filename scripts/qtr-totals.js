use Northwind

db.northwind.aggregate(
  {$project: {
      _id:1,
      "orderId" : 1,
      "orderDate" : 1,
      "qtr" : {$add: [{$divide:[{$subtract:[{$month:"$orderDate"},1]},3]},1]},
      "month" : {$month: "$orderDate"},
      "requiredDate" : 1,
      "shippedDate" : 1,
      "shipperName" : "$shipVia",
      "freightCost" : 1,
      "orderItems.unitPrice" : 1,
      "orderItems.quantity" : 1,
      "orderItems.supplier" : 1

  }},
  {$project: {
        _id:1,
        "orderId" : 1,
        "orderDate" : 1,
        "qtr" : {$subtract: ["$qtr", {$mod:["$qtr",1]}]},
        "month" : {$month: "$orderDate"},
        "requiredDate" : 1,
        "shippedDate" : 1,
        "shipperName" : 1,
        "freightCost" : 1,
        "orderItems.unitPrice" : 1,
        "orderItems.quantity" : 1,
        "orderItems.supplier" : 1

   }},
   {$unwind : "$orderItems"},
   {$project: {
           _id:1,
           "orderId" : 1,
           "orderDate" : 1,
           "qtr" : 1,
           "month" : 1,
           "requiredDate" : 1,
           "shippedDate" : 1,
           "shipperName" : 1,
           "freightCost" : 1,
           "orderItems.unitPrice" : 1,
           "orderItems.quantity" : 1,
           "orderItems.supplier" : 1,
           "orderItems.lineItemTotal" :
              {$multiply : ["$orderItems.unitPrice", "$orderItems.quantity"]}
   }},
   {$group : {
      _id : {"Quarter" : "$qtr"},
      "OrderTotal" : {$sum : "$orderItems.lineItemTotal"}
   }},
   {$sort : {
      "_id.Quarter" : 1
   }}
).toArray()
