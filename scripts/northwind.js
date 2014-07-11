// 6-30-14
// northwind.js mongo shell script
// Build consolidated orders collection (northwind)
// 

// Run this way from command line: mongo northwind.js

var orders, order, shipper, customer, employee,
    product_map = {}, supplier_map = {}, category_map = {},
    doc_cnt = 0, northwind;

// build product map
function buildProductMap() {
    var obj = {};
    var products = db.products.find({});

    products.forEach(function(product) {
        obj = {
            id:product.ProductID, name:product.ProductName,
            supplier: product.SupplierID, category: product.CategoryID
        };
        product_map[product.ProductID] = obj;
    });
}

// build supplier map
function buildSupplierMap() {
    var obj = {};
    var suppliers = db.suppliers.find({});

    suppliers.forEach(function(supplier) {
        obj = { name:supplier.CompanyName };
        supplier_map[supplier.SupplierID] = obj;
    });
}

// build category map
function buildCategoryMap() {
    var obj = {};
    var categories = db.categories.find({});

    categories.forEach(function(category) {
        obj = { name:category.CategoryName };
        category_map[category.CategoryID] = obj;
    });
}

// Add order details to specified 'raw' order
function processOrderItems(order) {
    var sup_id, cat_id, arr = [];
    var items = db.order_details.find({OrderID:order.OrderID});

    items.forEach(function(item) {
        // add new fields
        item.productName = product_map[item.ProductID].name;

        sup_id = product_map[item.ProductID].supplier;
        item.supplier = supplier_map[sup_id].name;

        cat_id = product_map[item.ProductID].category;
        item.category = category_map[cat_id].name;

        // rename existing fields
        item.productId = item.ProductID;
        item.unitPrice = item.UnitPrice;
        item.quantity = item.Quantity;

        // delete un-needed fields
        delete item._id;
        delete item.OrderID;
        delete item.ProductID;
        delete item.UnitPrice;
        delete item.Quantity;
        delete item.Discount;

        // printjson(item);

        arr.push(item);

    });

    order.orderItems = arr;
}

// rename and project fields to align with "MongoDB Aggregation Framework"
// ebook by John Lynn
function renameAndProject() {

    var doc = {
        orderId : "$OrderID", orderDate : "$OrderDate",
        requiredDate : "$RequiredDate", shippedDate : "$ShippedDate",
        shipVia : "$ShipVia",
        freightCost : "$Freight",
        "customer.companyName" : "$customer.CompanyName",
        "customer.contactName" : "$customer.ContactName",
        "customer.address" : "$customer.Address",
        "customer.city" : "$customer.City",
        "customer.region" : "$customer.Region",
        "customer.postalCode" : "$customer.PostalCode",
        "customer.country" : "$customer.Country",
        "customer.phone" : "$customer.Phone",
        "customer.fax" : "$customer.Fax",

        "employee.employeeId" : "$employee.EmployeeID",
        "employee.firstName" : "$employee.FirstName",
        "employee.lastName" : "$employee.LastName",

        orderItems : 1
    };

    db.northwind.aggregate([{$project : doc }, {$out : 'northwind'}]);
}

//--------------------- MAIN STARTS HERE --------------------------

print("build 'northwind' consolidated orders collection");

conn =  new Mongo();
db = conn.getDB('Northwind');
print('connecting to: '+db.getName());

if (db.getCollection('northwind').exists() != null) {
    print("found existing 'northwind' collection -- aborting");
    quit();
}

// Build a map for products, categories and suppliers so we can easily
// attach this information to each retrieved order document as we process
// the order collection
buildProductMap();
buildSupplierMap();
buildCategoryMap();

// Now iterate through 'raw' orders collection
orders = db.orders.find();

while (orders.hasNext()) {
    order = orders.next();
    doc_cnt++;

    // change date strings to date type
    order.OrderDate = new Date(order.OrderDate);
    order.RequiredDate = new Date(order.RequiredDate);
    order.ShippedDate = new Date(order.ShippedDate);

    // access shipper info
    shipper = db.shippers.findOne({ShipperID:order.ShipVia});
    order.ShipVia = shipper.CompanyName;

    // access customer info
    customer = db.customers.findOne({CustomerID: order.CustomerID});
    delete customer._id;
    order.customer = customer;

    // access employee info
    employee = db.employees.findOne({EmployeeID:order.EmployeeID});
    delete employee._id;
    order.employee = employee;

    // add order details to order
    processOrderItems(order);

    // debug print
    // printjson(order);

    // Finally, insert order into 'northwind' collection
    print("write document ", doc_cnt);
    db.northwind.insert(order);

}

print("wrote 'northwind' collection ok");

renameAndProject();


