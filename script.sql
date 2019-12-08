create table answer
(
  AID     INT(10) auto_increment
    primary key,
  QID     INT(10)      null,
  text    VARCHAR(225) not null,
  correct BINARY(1)    null
);

create index Answer_question_QID_fk
  on answer (QID);

create table candidate
(
  email     VARCHAR(45)         not null
    primary key,
  username  VARCHAR(45)         not null,
  telephone VARCHAR(15)         null,
  cv        VARCHAR(225)        null,
  approved  BINARY(1) default 0 null,
  password  VARCHAR(45)         not null,
  score     INT(10) default 0   null
);

create table candidate_answer
(
  email VARCHAR(45) null,
  QID   INT(10)     null,
  AID   INT(10)     null
);

create index candidate_answer_answer_AID_fk
  on candidate_answer (AID);

create index candidate_answer_candidate_email_fk
  on candidate_answer (email);

create index candidate_answer_question_QID_fk
  on candidate_answer (QID);

create table candidate_exam
(
  C_email    VARCHAR(45)  null,
  test_score INT(10)      null,
  deadline   DATETIME(19) not null,
  TID        INT(10)      null
);

create index Candidate_Exam_candidate_email_fk
  on candidate_exam (C_email);

create index candidate_exam_test_TID_fk
  on candidate_exam (TID);

create table hr
(
  email    VARCHAR(45) not null
    primary key,
  password VARCHAR(45) not null,
  name     VARCHAR(45) not null
);

create table position
(
  PID         INT(10) auto_increment
    primary key,
  name        VARCHAR(45)  null,
  available   BINARY(1)    not null,
  description VARCHAR(225) null,
  salary      INT(10)      null
);

create table question
(
  QID  INT(10) auto_increment
    primary key,
  text VARCHAR(225) not null,
  TID  INT(10)      null
);

create index Question_test_TID_fk
  on question (TID);

create table test
(
  TID  INT(10) auto_increment
    primary key,
  type VARCHAR(25) not null
);


