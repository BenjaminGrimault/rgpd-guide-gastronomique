const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DB = function() {
    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'rgpd-guide-gastronomique';

    const executeQuery = function(query) {
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
           
            const db = client.db(dbName);

            // Call callback function, which must call closeConnection function
            // function(db, closeConnection) {
            //    closeConnection();
            // }
            query(db, function() {
              client.close();
            });
        });
    };

    // Returns all users
    this.getUsers = function(closure) {
        executeQuery(function(db, closeConnection) {
            const usersCollection = db.collection('Users');

            usersCollection.find({}).toArray(function(err, users) {
                assert.equal(err, null);

                closeConnection();
    
                closure(users);
            });
        });
    };
};

db = new DB();
