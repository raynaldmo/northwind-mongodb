
# northwind-mongodb

northwind-mongodb is a simple node.js app with a command line interface
(northwind) to display sample Northwind Traders database reports. Google
'northwind traders' for more info on this database.

(Note: The csv collection files used are from the
[northwind-mongo] project. Much props to the authors.)

This app is meant to be learning tool for those learning how to implement
mongodb CRUD and aggregation operations using the node native mongodb driver.

The Northwind Traders database used in this app is indentical to that
used in the text [MongodDB Aggregation Framework].

A command line interface was chosen to avoid the overhead/
complexity of a web server/web interface.

*If you're learning mongoDB, feel free to play with and contribute 
to this app*.

 
* Add command line options for additional reports (employee list etc).
* Don't use grunt to import database. Instead use command line option and
add necessary code to create database and collections. This would allow northwind-mongodb to be published as a standalone 
  npm package.
* Other features you may think of.


## Installation Steps


### Get project files
Download ZIP file or clone this repository.
cd to directory where the files are installed on your system.

Directory should contain the following:

    $ ls
    collections  Gruntfile.js  index.js  lib  LICENSE  package.json  README.md  scripts
    
    
**Note: The following steps assume [node] and npm is installed and working
on your system.**

### Install node modules
    $ npm install

### Install northwind executable
On unix systems, this will typically
install the 'northwind' executable in /usr/bin or /usr/local/bin

    $ npm install -g northwind-mongodb
    or
    $ sudo npm install -g northwind-mongodb

### Install grunt

The [grunt] utility is used to create the mongodb Northwind database 
and collections used by this app.
On unix systems, this will typically install grunt in /usr/bin or
/usr/local/bin

    $ npm install -g grunt-cli
    or
    $ sudo npm install -g grunt-cli


## Import database and collections
For this to work, you'll of course need to have mongodb installed on your 
system and have the mongod daemon running.

    $ grunt import --stack
    Running "mongoimport" task
    connected to: localhost:27017
    2014-07-11T14:13:39.411-0700 dropping: Northwind.categories
    2014-07-11T14:13:39.418-0700 imported 8 objects
    connected to: localhost:27017
    2014-07-11T14:13:39.471-0700 dropping: Northwind.customers
    2014-07-11T14:13:39.487-0700 check 9 92
    2014-07-11T14:13:39.491-0700 imported 91 objects
    connected to: localhost:27017
    2014-07-11T14:13:39.540-0700 dropping: Northwind.employee_territories
    2014-07-11T14:13:39.550-0700 check 9 50
    2014-07-11T14:13:39.553-0700 imported 49 objects
    connected to: localhost:27017
    2014-07-11T14:13:39.601-0700 dropping: Northwind.employees
    2014-07-11T14:13:39.609-0700 check 9 13
    2014-07-11T14:13:39.610-0700 imported 12 objects
    connected to: localhost:27017
    2014-07-11T14:13:39.658-0700 dropping: Northwind.order_details
    2014-07-11T14:13:39.851-0700 check 9 2156
    2014-07-11T14:13:39.902-0700 imported 2155 objects
    connected to: localhost:27017
    2014-07-11T14:13:39.950-0700 dropping: Northwind.orders
    2014-07-11T14:13:40.079-0700 check 9 831
    2014-07-11T14:13:40.084-0700 imported 830 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.132-0700 dropping: Northwind.products
    2014-07-11T14:13:40.148-0700 check 9 78
    2014-07-11T14:13:40.150-0700 imported 77 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.198-0700 dropping: Northwind.regions
    2014-07-11T14:13:40.202-0700 imported 4 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.250-0700 dropping: Northwind.shippers
    2014-07-11T14:13:40.253-0700 imported 3 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.302-0700 dropping: Northwind.suppliers
    2014-07-11T14:13:40.312-0700 check 9 30
    2014-07-11T14:13:40.313-0700 imported 29 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.365-0700 dropping: Northwind.territories
    2014-07-11T14:13:40.376-0700 check 9 54
    2014-07-11T14:13:40.378-0700 imported 53 objects
    connected to: localhost:27017
    2014-07-11T14:13:40.426-0700 dropping: Northwind.northwind
    2014-07-11T14:13:40.748-0700 check 9 830
    2014-07-11T14:13:40.749-0700 imported 830 objects
    
    Done, without errors.

    

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
[northwind-mongo]:https://github.com/tmcnab/northwind-mongo