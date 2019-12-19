let mysql = require('mysql');

class Model {
    createConnectionPool() {
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'hrsystem',
            port: 3311
        });
        return connection;
    } // end connect

    disconnect(connection) {
        connection.end((err) => {
            if (err)
                return err.message;
        });
    }

    queryFunction(sql, values) {
        return new Promise(((resolve, reject) => {
            console.log(sql);
            console.log(values);
            let connection = this.createConnectionPool();
            connection.connect(function (err) {
                if (err) {
                    console.log("Error: " + err.message);
                    reject(err);
                }
                else {
                    console.log("Connection established!");
                }
            });
            connection.query(sql, values, (err, result) => {
                if(err){
                    console.log(err.message);
                }
                resolve({ //return as json
                    result: result,
                    connection: connection
                });
            });
        }));
    }

    getUser(email, password) {
        let sql = 'SELECT * FROM candidate where email = ? AND password = ?';
        return this.queryFunction(sql, [email, password]);
    }
    getHR(email, password) {
        let sql = 'SELECT * FROM hr where email = ? AND password = ?';
        return this.queryFunction(sql, [email, password]);
    }

    getAllHR() {
        let sql = "SELECT * FROM hr";
        return this.queryFunction(sql, "");

    }
    viewPositions() {
        let sql = "SELECT * FROM position";
        return this.queryFunction(sql, "");
    }
    deletePosition(PID){
        let sql = "DELETE FROM position where PID = ?";
        return this.queryFunction(sql, [PID]);
    }
    addPosition(title, available, description, salary) {
        let sql = "INSERT INTO position VALUES (''" + ", '" + title + "', '" + available + "','" + description + "','" + salary + "')";
        return this.queryFunction(sql, "");
    }
}

const mainModel = new Model();
export default mainModel;
