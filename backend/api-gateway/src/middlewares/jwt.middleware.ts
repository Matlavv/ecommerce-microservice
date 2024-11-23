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

        // Check if token is valid
        if (data.isValid) {   
            req.userId = data.userId; 
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