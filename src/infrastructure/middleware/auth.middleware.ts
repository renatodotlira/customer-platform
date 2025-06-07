import { Request, Response, NextFunction } from 'express';
import { configService } from '../configs/env.config';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userAccountId: string;
  businessId: string;
  roles: string[]
}

declare global {
  namespace Express {
    interface Request {
      jwtPayload?: JwtPayload;
    }
  }
}

export const verifyToken = (roles) => (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(403).json({ message: 'No token provided' })
    return
  };

  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    req.userId = (decoded as any).id;
    next();
  });
};

export const authorizeRoles = (requiredRoles: string[]) => (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acesso negado" });
  jwt.verify(token, configService.get("AUTHENTICATION").JWT.SECRET, (err, jwtPayload: JwtPayload) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    const hasAccess = requiredRoles.some(role => jwtPayload.roles.includes(role));
    if (!hasAccess) return res.status(403).json({ message: "Acesso não autorizado" });
    
    req.jwtPayload = jwtPayload;
    next();
  });
};
