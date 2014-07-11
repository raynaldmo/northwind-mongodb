# northwind-mongodb

northwind-mongodb is a simple node package with a command line interface
(northwind) to generate sample northwind traders db reports

This package is meant to be learning tool for mongodb CRUD and aggregation
operations. Command line operation was chosen to avoid the overhead/
complexity of a web server/web interface.

Feel free to contribute!

## Installation

    npm install -g northwind-mongodb

## Options
  -h			Display help
  -o			Set mongodb host
  -p			Set mongodb port
  -c			Display customers
  -y			Display customer yearly orders

## Defaults
   mongodb host default is 'localhost'
   mongodb port default is 27017

   If the defaults are ok, the no need to use -o and/or -p options

## Examples

### Set mongodb host

    $ northwind -o '192.168.0.252'

### Set mongodb port

    $ northwind -p 5000

### Show customer list
(expand terminal window as wide as possible for optimal display formatting)

    $ northwind -c | column -s '|' -t

### Show customer yearly orders

    $ northwind -y| column -s '|' -t
