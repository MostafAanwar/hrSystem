let mysql = require('mysql');

class Model{
    constructor (){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'hrsystem',
            port: 3311
        });

    }
    connect() {
         this.connection.connect(function (err) {
            if (err) {
                return console.error('error: ' + err.message);
            }
            console.log("Connection established!");
            return this.connection;

        });

    } // end connect
    disconnect(){
        this.connection.end((err) =>{
            if(err)
                return err.message;
        });
    }

    getAllHR(){
        // this.connect();
        let selectQuery = 'SELECT * FROM hr';
        this.connection.query(selectQuery, (error, results, fields) =>{
            if(error){
                return console.error("error: " + error.message);
            }
            // this.disconnect();
            // console.log(results);
            return results;

        });

    }
    getAllPositions(){
        // this.connect();
        let selectQuery = 'SELECT * FROM position';
         this.connection.query(selectQuery,(error, results, fields) =>{
            if(error){
                return console.error("error: " + error.message);
            }
             // this.disconnect();
             console.log(results);
             return results;
        });
    }
}

const mainModel = new Model();
export default mainModel;