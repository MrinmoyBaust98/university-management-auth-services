import mongoose from 'mongoose'
import config from './config/index'

import app from './app'
import { errorLogger, logger } from './shared/Logger/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database Connected Successfully')

    // when Connected then listen app call
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Database Disconnected', err)
  }
}
main()
