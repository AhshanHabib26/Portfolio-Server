import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { TUserRole } from '../user/user.interface'

const authHandler = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
    }

    jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }

        const role = (decoded as JwtPayload)?.role

        if (userRole && !userRole.includes(role)) {
          throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }

        req.user = decoded as JwtPayload
        next()
      },
    )
  })
}

export default authHandler
