insert into users (
    username,
    first_name,
    last_name,
    user_email,
    password,
    role
) values (
    ${username},
    $(first_name),
    $(last_name),
    $(user_email),
    ${password},
    ${role}
)

returning username, first_name, last_name, user_email, role