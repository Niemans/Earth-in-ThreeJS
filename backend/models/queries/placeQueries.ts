export const InsertPlace: string = `
    INSERT INTO places 
        (name, latitude, longitude) 
    VALUES 
        (?, ?, ?)
`;

export const getAllPlaces: string = `
    SELECT *
    from places
`;

export const getPlaceByID: string = `
    SELECT *
    FROM places
    WHERE PID = ?
`;

export const PlaceExists: string = `
    SELECT
    CASE WHEN ? IN (SELECT name FROM places) 
        THEN true
        ELSE false
    END as 'Exists'
    FROM dual
`;

export const deletePlace: string = `
    DELETE FROM places
    WHERE PID = ?
`;
