insert into test_questions (
    test_id,
    test_question
)   values (
    $1, 
    $2
)

returning test_question_id