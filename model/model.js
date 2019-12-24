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

    addTest(type) {
        let sql = "INSERT INTO test VALUES (''" + ", '" + type + "')";
        return this.queryFunction(sql, "");
    }

    savePosition(PID, email) {
        let sql = "UPDATE candidate SET PID = ? WHERE email = ? ";
        return this.queryFunction(sql, [PID, email]);
    }
    viewPositionCand() {
        let sql = "SELECT PID, title, description, salary  FROM position where available = '1'";
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

    editTestType(TID, type) {
        let sql = 'UPDATE test SET type = ? WHERE TID = ?';
        return this.queryFunction(sql, [type, TID]);
    }

    getRegisterees(){
        let sql = "SELECT * FROM candidate where approved is null";
        return this.queryFunction(sql, "");
    }

    alterApproval(email, values, len) {
        // let regex = RegExp('"([\\w@.]*)":"([01])"','g');
        // let array;
        // let email = [];
        // let values = [];
        // while ((array = regex.exec(str)) !== null) {
        //     email.push(array[1]);
        //     values.push(array[2]);
        // }
        let sql = 'UPDATE candidate SET approved = ? WHERE email = ?';
        let res;
        for(let i = 0; i< len; i++ ){
            res = this.queryFunction(sql, [values[i], email[i]]);
        }
        return res;
    }
    getApplicants(){
        let sql = "SELECT email, username, telephone, cv, position.title FROM candidate INNER JOIN position ON candidate.PID = position.PID WHERE approved = '1'";
            // 'SELECT * FROM candidate WHERE approved = "1"';
        return this.queryFunction(sql, "");
    }

    addUser(email, name, password, telephone){
        let sql = "INSERT INTO candidate VALUES ('" + email + "', '" + name + "', '" + telephone + "', '" + "" + "', '" + "" +  "', '" + password + "', '" + "" + "', '"  + "" + "')";
        return this.queryFunction(sql, "");
    }
    getTestTypes(){
        let sql = "SELECT * FROM test";
        return this.queryFunction(sql, "");
    }
    isSignedUp(email){
        let sql = "SELECT * FROM candidate WHERE email = ?";
        return this.queryFunction(sql, [email]);
    }
    addCVPath(path, email){
        let sql = 'UPDATE candidate SET cv = ? WHERE email = ?';
        return this.queryFunction(sql, [path, email]);
    }


    getExaminees() {
        let sql = 'SELECT email,username,telephone,score,title FROM candidate INNER JOIN position ON candidate.PID = position.PID WHERE email NOT IN ( SELECT C_email FROM candidate_exam WHERE test_score IS NULL)group by email';
        return this.queryFunction(sql, "");
    }

    getDetailedTests(C_email) {
        let sql = 'SELECT C_email,test.type,test_score,question.text,answer.textA\n' +
            'FROM   test\n' +
            '       INNER JOIN candidate_exam\n' +
            '         ON candidate_exam.TID = test.TID\n' +
            '       INNER JOIN question\n' +
            '                  INNER JOIN candidate_answer\n' +
            '                    ON candidate_answer.QID = question.QID\n' +
            '       INNER JOIN answer\n' +
            '\n' +
            'where C_email = ? ' +
            'and test.TID = question.TID\n' +
            'and answer.QID = question.QID\n' +
            'and answer.AID = candidate_answer.AID\n' +
            'and candidate_answer.email = C_email\n' +
            'group by question.text';
        return this.queryFunction(sql, [C_email]);
    }

    viewTests(candidateEmail) {
        // let candidateEmail ="habibaesmail@yahoo.com"; // TODO get Email from LINK of exam
        let sql = "SELECT * from candidate_exam where (C_email = ? AND test_score IS NULL)";
        return this.queryFunction(sql, [candidateEmail]);
    }
    getQuestions(TID){
        let sql = "SELECT * FROM question where TID = ? ORDER BY RAND() LIMIT 5";
        return this.queryFunction(sql, [TID]);
    }

    getAllQuestions(TID) {
        let sql = "SELECT * FROM question where TID = ?";
        return this.queryFunction(sql, [TID]);
    }

    getAllTests() {
        let sql = "SELECT * FROM test";
        return this.queryFunction(sql, "");
    }

    deleteTest(TID) {
        let sql = "DELETE FROM test,answer,question\n" +
            "USING test JOIN answer JOIN question\n" +
            "WHERE test.TID = question.TID\n" +
            "  AND question.QID = answer.QID\n" +
            "  AND test.TID = ?";
        return this.queryFunction(sql, [TID]);
    }
    getTestType(TID){
        let sql = "SELECT type FROM test where TID = ?";
        return this.queryFunction(sql, [TID]);
    }
    getCAnswer(QID){
        let sql = "SELECT * FROM answer where QID = ? AND correct = 1 ORDER BY RAND() LIMIT 1";
        return this.queryFunction(sql, [QID]);
    }
    getFAnswers(QID){
        let sql = "SELECT * FROM answer where QID = ? AND correct = 0 ORDER BY RAND() LIMIT 3";
        return this.queryFunction(sql, [QID]);
    }

    getAllAnswers(QID) {
        let sql = "SELECT * FROM answer where QID = ?";
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

    createExam(checkbox, sequence, email, deadline, HRMail) {
        let res ;
        let len = checkbox.length;
        console.log(sequence);
        let sql;
        let isEmpty;
        if(sequence.length === 0){
            isEmpty = true;
        }
        for(let i = 0; i< len; i++ ){
            if(isEmpty){
                sql = "INSERT INTO candidate_exam VALUES ('" + email + "', '" + "" + "', '" + deadline + "','" + checkbox[i] + "','" + HRMail + "','" + "')";
            }
            else{
                sql = "INSERT INTO candidate_exam VALUES ('" + email + "', '" + "" + "', '" + deadline + "','" + checkbox[i] + "','" + sequence[i] + HRMail + "','" + "')";
            }
            res = this.queryFunction(sql, "");
        }
        return res;
    }

}

const mainModel = new Model();
export default mainModel;
