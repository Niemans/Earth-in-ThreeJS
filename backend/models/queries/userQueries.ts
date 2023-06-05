
export const InsertUser: string = `
    INSERT INTO users 
        (name, email, password)
    VALUES
        (?, ?, ?)
`;

export const EmailExists: string = `
    SELECT
        CASE WHEN ? IN (SELECT email FROM users) 
            THEN true
            ELSE false
        END as 'Exists'
    FROM dual
`;

export const isAdmin: string = `
    SELECT
        CASE WHEN (SELECT type FROM users WHERE UID = ?) = "admin"
            THEN true
            ELSE false
        END as 'IsAdmin'
    FROM dual
`;

export const GetUserByEmail: string = `
    SELECT *
    FROM users
    WHERE email = ?
`;

export const GetUserByID: string = `
    SELECT *
    FROM users
    WHERE UID = ?
`;

export const getAllUsers: string = ` 
    SELECT 
        u.UID, u.name, u.email
    FROM users u
    WHERE u.type = 'user'
`;

export const UpdateUser: string = `
    UPDATE users 
    SET  
        password = ?
    WHERE email = ?
`;

export const DeleteUser: string = `
    DELETE FROM users
    WHERE UID = ?
`;