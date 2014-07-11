#!/usr/bin/env node

var argv = require('optimist').argv,
    parser = require('./lib/parser'),
    host = argv.o || process.env.MONGODB_HOST || 'localhost',
    port = argv.p || process.env.MONGODB_PORT || 27017,
    mongoDbUri;

var help = "Usage: northwind [OPTION]\n\
Display reports based on [OPTION].\n\
  -h\t\t\tDisplay help\n\
  -o\t\t\tSet mongodb host\n\
  -p\t\t\tSet mongodb port\n\
  -c\t\t\tDisplay customers\n\
  -y\t\t\tDisplay customer yearly orders\n";

if (argv.h) {
    console.log(help);
    process.exit(0);
}

if (!argv.c && !argv.y) {
    console.log(help);
    process.exit(1);
} else {
    mongoDbUri =  "mongodb://" + host + ":" + port + "/Northwind";
    console.log(mongoDbUri);

    if(argv.c) {
        parser.showCustomers(mongoDbUri);
    } else if (argv.y) {
        parser.showCustYearTotals(mongoDbUri);
    }
}