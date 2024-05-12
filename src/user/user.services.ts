import httpStatus from 'http-status'
import AppError from '../errors/AppError'
import { TUserType } from './user.interface'
import { User } from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type TUserLoginType = {
  email: string
  password: string
}

export const createUserService = async (payload: TUserType) => {
  const { name, email, password } = payload

  const user = await User.findOne({ email })

  if (user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User Already Exists!')
  }

  const result = await User.create({ name, email, password })
  return result
}

export const loginUserService = async (payload: TUserLoginType) => {
  const user = await User.findOne({ email: payload?.email }).select('+password')

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found!')
  }

  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Deleted!')
  }

  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
  }

  const isPasswordMarched = await bcrypt.compare(
    payload?.password,
    user?.password,
  )

  if (!isPasswordMarched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is Invalid')
  }

  const userPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }

  const accessToken = jwt.sign(
    userPayload,
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  )

  return {
    accessToken,
  }
}
