var mongoose = require("mongoose");
mongoose.connect( 'mongodb://localhost/admin' );
module.exports = {
    list: function(cb){
        mongoose.connection.db.collectionNames(function (err, names) {
          console.log(names); // [{ name: 'dbname.myCollection' }]
          cb(names)
        });
    }
}