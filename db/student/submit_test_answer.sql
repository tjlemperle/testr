insert into test_question_student_answers (
    test_question_id,
    student_response_id,
    user_id,
    date_taken
) values (
    $1,
    $2, 
    $3, 
    now()
)
