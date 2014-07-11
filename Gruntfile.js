module.exports = function (grunt) {
    "use strict";

    grunt.loadNpmTasks('grunt-mongoimport');

    grunt.initConfig({
        mongoimport: {
            options: {
                db : 'Northwind_test',
                host : 'localhost', //optional
                port: '27017', //optional
                stopOnError : true,  //optional
                collections : [
                    {
                        name : 'categories',
                        type : 'csv',
                        headerLine : true,
                        file : 'collections/categories.csv',
                        drop : true
                    },
                    {
                        name : 'customers',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/customers.csv',
                        drop : true
                    },
                    {
                        name : 'employee_territories',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/employee_territories.csv',
                        drop : true
                    },
                    {
                        name : 'employees',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/employees.csv',
                        drop : true
                    },
                    {
                        name : 'order_details',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/order_details.csv',
                        drop : true
                    },
                    {
                        name : 'orders',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/orders.csv',
                        drop : true
                    },
                    {
                        name : 'products',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/products.csv',
                        drop : true
                    },
                    {
                        name : 'regions',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/regions.csv',
                        drop : true
                    },
                    {
                        name : 'shippers',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/shippers.csv',
                        drop : true
                    },
                    {
                        name : 'suppliers',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/suppliers.csv',
                        drop : true
                    },
                    {
                        name : 'territories',
                        type :'csv',
                        headerLine : true,
                        file : 'collections/territories.csv',
                        drop : true
                    },
                    {
                        name : 'northwind',
                        type :'json',
                        file : 'collections/northwind.json',
                        drop : true
                    }
                ]
            }
        }
    });

    grunt.registerTask('import', ['mongoimport']);

};
