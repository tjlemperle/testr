select t.test_id, t.test_name, tq.test_question_id, tq.test_question, tqo.test_question_option_id, tqo.test_question_option, tqsa.student_response_id,  tqo.test_question_answer 
from tests t
join test_questions tq on t.test_id = tq.test_id
join test_question_options tqo on tq.test_question_id = tqo.test_question_id
join test_question_student_answers tqsa on tq.test_question_id = tqsa.test_question_id
where t.test_id = $1
and tqsa.user_id = $2

