import { Controller, HttpRequest, HtttpResponse } from '../../presentation/protocols'
import { Request, Response } from 'express'

export const adptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HtttpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
