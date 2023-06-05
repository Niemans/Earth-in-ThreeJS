export const GetComment: string = `
    Select *
    from comments c
    where c.CID = ?
`;


export const GetUserComments: string = `
    Select *
    from comments c
    where c.UID = ?
    order by c.CID
`;

export const GetFlightComments: string = `
    Select c.*, u.name as userName
    from comments c
    inner join users u on c.UID = u.UID
    where c.FID = ?
    order by c.CID
`;

export const GetPlaceComments: string = `
    Select c.*, u.name as userName
    from comments c
    inner join users u on c.UID = u.UID
    where c.PID = ?
    order by c.CID
`;

export const GetAllComments: string = `
    Select *
    from comments c
`;



export const InsertComment: string = `
    INSERT INTO comments 
        (UID, FID, PID, title, content)
    VALUES
        (?, ?, ?, ?, ?) 
`;

export const updateComment: string = `
    UPDATE comments 
    SET 
        title = ?,
        content = ?
    WHERE CID = ?
`;

export const DeleteComment: string = `
    DELETE FROM comments
    WHERE CID = ?
`;

