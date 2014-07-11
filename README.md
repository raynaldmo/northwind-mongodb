
# northwind-mongodb

northwind-mongodb is a simple node.js app with a command line interface
(northwind) to display sample Northwind Traders database reports. Google
'northwind traders' for more info.

This app is meant to be learning tool for those learning how to implement
mongodb CRUD and aggregation operations using the native node mongodb driver.

The Northwind Traders database used in this app is indentical to that
used in the text [MongodDB Aggregation Framework].

A command line interface was chosen to avoid the overhead/
complexity of a web server/web interface.

#### If you're learning mongoDB, feel free to play with this app and contribute to it!

 
* Add command line options for additional reports (employee list etc.)
* Other features


## Installation Steps
(Note: Of course [node] must be properly installed and working on your system 
for the following installation steps to work)

### Install grunt

The [grunt] utility is used to create the mongodb Northwind database 
and collections used by this app. Run the following from any directory.
On unix systems, this will typically install grunt in /usr/bin.

    $ npm install -g grunt-cli
    or
    $ sudo npm install -g grunt-cli
    
### Install app modules
cd to directory of choice and run the following:

    $ npm install
    
### Install app binary
From any directory, run the following. On unix systems, this will typically install grunt in /usr/bin.

    $ npm install -g northwind-mongodb
    or
    $ sudo npm install -g northwind-mongodb
    
## Import database and collections
For this to work, you'll of course need to have mongodb installed on your 
and the mongod daemon running. From any directory run the following:

    $ grunt import --stack

## Verify database import
From mongo shell:

    > show dbs
    ...
    Northwind
    ...
    
    > use Northwind
    switched to db Northwind
    > show collections
    categories
    customers
    employee_territories
    employees
    northwind
    order_details
    orders
    products
    regions
    shippers
    suppliers
    system.indexes
    territories
    
    > db.northwind.count()
    830

    > db.customers.findOne()
    {
    	"_id" : ObjectId("53b309ddf468718462e0af15"),
    	"CustomerID" : "ALFKI",
    	"CompanyName" : "Alfreds Futterkiste",
    	"ContactName" : "Maria Anders",
    	"ContactTitle" : "Sales Representative",
    	"Address" : "Obere Str. 57",
    	"City" : "Berlin",
    	"Region" : "NULL",
    	"PostalCode" : 12209,
    	"Country" : "Germany",
    	"Phone" : "030-0074321",
    	"Fax" : "030-0076545"
    }
    > 


If you don't get the above results, something went wrong with the import.
Check your terminal output for any errors.

## Running the app
    
### Display help

    $ northwind -h
    Usage: northwind [OPTION]
    Display reports based on [OPTION].
    -h			Display help
    -o			Set mongodb host
    -p			Set mongodb port
    -c			Display customers
    -y			Display customer yearly orders


#### Defaults
   
   mongodb host default is 'localhost'
   
   mongodb port default is 27017

   If the defaults are ok, then no need to use -o and/or -p options
 

### Set mongodb host

    $ northwind -o '192.168.0.252'

### Set mongodb port

    $ northwind -p 5000

### Show customer list
(expand terminal window as wide as possible for optimal display formatting)

    $ northwind -c | column -s '|' -t

### Show customer yearly orders

    $ northwind -y| column -s '|' -t

[MongodDB Aggregation Framework]:http://www.amazon.com/MongoDB-Aggregation-Framework-Principles-Examples-ebook/dp/B00DGKGWE4/ref=sr_1_1?ie=UTF8&qid=1405105431&sr=8-1&keywords=mongodb+aggregation
[node]:http://nodejs.org
[grunt]:http://gruntjs.com