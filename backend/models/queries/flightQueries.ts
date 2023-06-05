export const getAllFlights: string = `
    SELECT *
    from flights
`;

export const getFlightByID: string = `
    SELECT *
    FROM flights
    WHERE FID = ?
`;

export const getFlightByPaces: string = `
    SELECT *
    FROM flights
    WHERE sPID = ?
    AND fPID = ?
`;

export const InsertFlight: string = `
    INSERT INTO flights (sPID, fPID, time) 
    VALUES (?, ?, ?)
`;

export const deleteFlight: string = `
    DELETE FROM flights
    WHERE FID = ?
`;

export const updateFlight: string = `
    UPDATE flights 
    SET  
        time = ?
    WHERE FID = ?
`;