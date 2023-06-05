import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { z } from 'zod'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Zod Schema
    const createUserZodSchema = z.object({
      body: z.object({
        role: z.string({
          required_error: 'role is required',
        }),
        password: z.string().optional(),
      }),
    })

    // jehetu async function tai schema er por await use korte hobe
    await createUserZodSchema.parseAsync(req)

    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (e) {
    next(e)

    // res.status(400).json({
    //   // success: false,
    //   // message: 'Feild to createuser',
    //   error: error,
    // })
    // next()
  }
}

export const UserController = {
  createUser,
}
