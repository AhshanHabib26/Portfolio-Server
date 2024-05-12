/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Schema, model } from 'mongoose'
import { TUserType } from './user.interface'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, 
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true },
)

// Hashed password before save DB
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.SALT_ROUND),
  )
})

export const User = model<TUserType>('User', userSchema)
