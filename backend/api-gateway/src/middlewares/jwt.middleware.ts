import { Request, Response, NextFunction } from 'express';


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/validate-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            },
        });
        const data = await response.json();

        console.log('[Gate] verifyToken fetched data', data);
        
        // Check if token is valid
        if (data.isTokenValid) {
            req.userId = data.userId;
            req.userRole = data.userRole;
            next();
        } else {
            res.status(403).json({ message: "Token invalide" });
            return;
        }
    

    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: token invalide"});
    }
}

export const verifyTokenAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/validate-admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            },
        });
        const data = await response.json();

        console.log('[Gate] requireAdmin fetched data', data);
        
        // Check if token is valid
        if (data.isAdmin) {  
            req.userId = data.userId; 
            req.userRole = data.userRole; 
            next();
        } else {
            res.status(403).json({ message: "Accès interdit: vous n'êtes pas administrateur" });
            return;
        }
    
    } catch (error) {
        console.log(error);
        res.status(403).json({message: "Accès interdit: vous n'êtes pas administrateur"});
    }
}