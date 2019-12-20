ALTER TABLE candidate ADD PID int NULL;
ALTER TABLE candidate
  ADD CONSTRAINT candidate_position_PID_fk
FOREIGN KEY (PID) REFERENCES position (PID);


ALTER TABLE position CHANGE name title varchar(45);


ALTER TABLE position MODIFY available boolean;