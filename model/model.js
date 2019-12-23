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
    savePosition(PID,username){
        let sql = "UPDATE canidate SET PID = ? WHERE username = ? ";
        return this.queryFunction(sql, [PID,username]);
    }
    viewPositionCand() {
        let sql = "SELECT PID, name, description, salary  FROM position where available = 1";
        return this.queryFunction(sql, "");
    }

    getPosition(PID){
        let sql = "SELECT * FROM position WHERE PID = ?";
        return this.queryFunction(sql, [PID]);
    }
    editPosition(PID, title, available, description, salary){
        let sql = 'UPDATE position SET title = ?, description = ?, available = ?, salary = ? WHERE PID = ?';
        return this.queryFunction(sql, [title , description, available, salary, PID]);
    }

    getRegisterees(){
        let sql = "SELECT * FROM candidate where approved is null";
        return this.queryFunction(sql, "");
    }
    alterApproval(str, len){
        let regex = RegExp('"([\\w@.]*)":"([01])"','g');
        let array;
        let email = [];
        let values = [];
        while ((array = regex.exec(str)) !== null) {
            email.push(array[1]);
            values.push(array[2]);
        }
        let sql = 'UPDATE candidate SET approved = ? WHERE email = ?';
        let res;
        for(let i = 0; i< len; i++ ){
            res = this.queryFunction(sql, [values[i], email[i]]);
        }
        return res;
    }
    getApplicants(){
        let sql = 'SELECT * FROM candidate WHERE approved = "1"';
        return this.queryFunction(sql, "");
    }
    getExaminees(){
        let sql = 'SELECT email,username,telephone,score,title FROM candidate INNER JOIN position ON candidate.PID = position.PID WHERE email NOT IN ( SELECT C_email FROM candidate_exam WHERE test_score IS NULL)group by email'
        return this.queryFunction(sql,"");
    }
    getDetailedTests(C_email){
        let sql = 'SELECT C_email,test.type,test_score,question.text,answer.textA\n' +
            'FROM   test\n' +
            '       INNER JOIN candidate_exam\n' +
            '         ON candidate_exam.TID = test.TID\n' +
            '       INNER JOIN question\n' +
            '                  INNER JOIN candidate_answer\n' +
            '                    ON candidate_answer.QID = question.QID\n' +
            '       INNER JOIN answer\n' +
            '\n' +
            'where C_email = ?' +
            'and test.TID = question.TID\n' +
            'and answer.QID = question.QID\n' +
            'and answer.AID = candidate_answer.AID\n' +
            'and candidate_answer.email = C_email\n' +
            'group by question.text';
        return this.queryFunction(sql,[C_email]);
    }
    viewTests(){
        let candidateEmail ="habibaesmail@yahoo.com"; // TODO get Email from LINK of exam
        let sql = "SELECT * from candidate_exam where (C_email = ? AND test_score IS NULL)";
        return this.queryFunction(sql, [candidateEmail]);
    }
    getQuestions(TID){
        let sql = "SELECT * FROM question where TID = ? ORDER BY RAND() LIMIT 5";
        let que = this.queryFunction(sql, [TID]);
        return que;
    }
    getTestType(TID){
        let sql = "SELECT type FROM test where TID = ?";
        let type = this.queryFunction(sql, [TID]);
        return type;
    }
    getCAnswer(QID){
        let sql = "SELECT * FROM answer where QID = ? AND correct = 1 ORDER BY RAND() LIMIT 1";
        return this.queryFunction(sql, [QID]);
    }
    getFAnswers(QID){
        let sql = "SELECT * FROM answer where QID = ? AND correct = 0 ORDER BY RAND() LIMIT 3";
        return this.queryFunction(sql, [QID]);
    }
    saveAnswer(AID,QID,email){
        let sql = "INSERT INTO candidate_answer VALUES ('" + email + "','" + QID + "','" + AID + "')";
        return this.queryFunction(sql, "");
    }
    saveTestScore(C_email,TID,test_score){
        let sql = 'UPDATE candidate_exam SET test_score = ? WHERE (TID = ? AND C_email = ?)';
        return this.queryFunction(sql, [test_score, TID, C_email]);
    }
    saveTotalScore(C_email,test_score){
        let sql = 'UPDATE candidate SET score = score + ? WHERE email = ?';
        return this.queryFunction(sql,[test_score, C_email]);
    }
}

const mainModel = new Model();
export default mainModel;
