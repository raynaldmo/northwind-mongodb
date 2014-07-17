module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-mongoimport');

    var csv_options = {
        db : 'Northwind',
        host : 'localhost', //optional
        port: '27017', //optional
        stopOnError : true,  //optional
        collections : [
            {
                name : 'categories',
                type : 'csv',
                headerLine : true,
                file : 'collections/csv/categories.csv',
                drop : true
            },
            {
                name : 'customers',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/customers.csv',
                drop : true
            },
            {
                name : 'employee_territories',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/employee_territories.csv',
                drop : true
            },
            {
                name : 'employees',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/employees.csv',
                drop : true
            },
            {
                name : 'order_details',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/order_details.csv',
                drop : true
            },
            {
                name : 'orders',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/orders.csv',
                drop : true
            },
            {
                name : 'products',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/products.csv',
                drop : true
            },
            {
                name : 'regions',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/regions.csv',
                drop : true
            },
            {
                name : 'shippers',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/shippers.csv',
                drop : true
            },
            {
                name : 'suppliers',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/suppliers.csv',
                drop : true
            },
            {
                name : 'territories',
                type :'csv',
                headerLine : true,
                file : 'collections/csv/territories.csv',
                drop : true
            },
            {
                name : 'northwind',
                type :'json',
                // TODO: create csv version
                file : 'collections/csv/northwind.json',
                drop : true
            }
        ]
    };
    var json_options = {
        db : 'Northwind',
        host : 'localhost', //optional
        port: '27017', //optional
        stopOnError : true,  //optional
        collections : [
            {
                name : 'categories',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/categories.json',
                drop : true
            },
            {
                name : 'customers',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/customers.json',
                drop : true
            },
            {
                name : 'employee_territories',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/employee_territories.json',
                drop : true
            },
            {
                name : 'employees',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/employees.json',
                drop : true
            },
            {
                name : 'order_details',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/order_details.json',
                drop : true
            },
            {
                name : 'orders',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/orders.json',
                drop : true
            },
            {
                name : 'products',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/products.json',
                drop : true
            },
            {
                name : 'regions',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/regions.json',
                drop : true
            },
            {
                name : 'shippers',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/shippers.json',
                drop : true
            },
            {
                name : 'suppliers',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/suppliers.json',
                drop : true
            },
            {
                name : 'territories',
                type : 'json',
                jsonArray : true,
                file : 'collections/json/territories.json',
                drop : true
            },
            {
                name : 'northwind',
                type :'json',
                file : 'collections/json/northwind.json',
                drop : true
            }
        ]
    };

    // grunt-mongoimport is currently not multitask, so for now
    // statically configure options for either json or csv files
    grunt.initConfig({
        mongoimport: {
            // 7-16-2014 raynaldmo
            // grunt-mongoimport@0.1.4 doesn't support --headerline option
            // but ver 0.1.5 does - so one can choose csv or json files
            // if this latter version is used.
            // Here we opt to use json files
            // options: csv_options
            options: json_options
        }
    });

    grunt.registerTask('import', ['mongoimport']);
};
