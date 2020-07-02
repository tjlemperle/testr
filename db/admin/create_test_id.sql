insert into tests (
    test_name,
    class_id, 
    start_date,
    end_date,
    test_avail_status
) values (
    $1,
    $2,
    now(),
    now(),
    true
)