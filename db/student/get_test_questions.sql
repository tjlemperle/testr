select t.test_id, t.test_name, t.test_id, tq.test_question_id, tq.test_question, tqo.test_question_option_id, tqo.test_question_option, tqo.test_question_answer
from test_questions tq
join tests t on t.test_id = tq.test_id
join test_question_options as tqo on tq.test_question_id = tqo.test_question_id
where t.test_id = $1