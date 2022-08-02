
import { Middleware } from 'redux'

export const loggingMiddleware: Middleware<{}, {}> = storeApi => next => action => {
  next(action)
}