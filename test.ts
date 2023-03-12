// tests go here; this will not be compiled when this package is used as an extension.
database.deleteAll()
database.setNumberValue("test123123", 123);
console.log(database.getNumberValue("test123123"));