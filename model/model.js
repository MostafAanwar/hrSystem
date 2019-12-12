let mysql = require('mysql');
class Model{
    connect() {
            let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'hrsystem'
        });
        connection.connect(function (error) {
            if (error) {
                return console.error('error: ' + error.message);
            }
            console.log("Connection established!");
            return connection;

        });
    } // end connect
    disconnect(connection){
        connection.end()
    }

    viewHR(){
        let connection = this.connect();
        let query = 'SELECT * FROM hr';
        connection.query(query,(error, results, fields) =>{
            if(error){
                return console.error(error.message);
            }
            console.log(results);
        });
        disconnect(connection);
    }
}

const mainModel = new Model();
export default mainModel;