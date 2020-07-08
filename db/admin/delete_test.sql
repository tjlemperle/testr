delete from test_question_options where test_question_id in (select test_question_id from test_questions where test_id = $1);
delete from test_questions where test_id = $1;
delete from tests where test_id = $1;