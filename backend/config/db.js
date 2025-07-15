const mongoose = require('mongoose');
const mysql = require('mysql2/promise');  // Ensure this line is included

const connectDB = async () => {
    // try {
    //     const conn = await mongoose.connect(process.env.MONGO_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //     });
    //     console.log(`MongoDB Connected: ${conn.connection.host}`);
    // } catch (error) {
    //     console.error(`Error: ${error.message}`);
    //     process.exit(1);
    // }

    //connection to moodle
    try {
        // Create a connection to the Moodle database
        console.log("try block working")
        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,    // Database host
            user: process.env.MYSQL_USER,    // Database user
            password: process.env.MYSQL_PASSWORD, // Database password
            database: process.env.MYSQL_DATABASE, // Moodle database name
        });

        // Connect to the MySQL database
        connection.connect((err) => {
            if (err) {
                console.error(`Error: ${err.message}`);
                process.exit(1);
            } else {
                console.log(`Connected to Moodle Database: ${process.env.MYSQL_HOST}`);
            }
        });

        // ✅This message will only run if connection is successful
        console.log(`Connected to Moodle Database: ${process.env.MYSQL_HOST}`);

        // Return the connection object
        return connection;

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }




};

module.exports = connectDB;
