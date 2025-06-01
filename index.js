import express from "express";
import amenitiesRouter from './routes/amenities.js';
import bookingsRouter from './routes/bookings.js';
import hostsRouter from './routes/hosts.js';
import propertiesRouter from './routes/properties.js';
import reviewsRouter from './routes/reviews.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import log from './middleware/logMiddleware.js';
import 'dotenv/config';
import * as Sentry from '@sentry/node'

import errorHandler from './middleware/errorHandler.js';

const app = express();

Sentry.init({
  dsn: "https://b9210ab85cb75490f8c9b86d4754cf54@o4508167104167936.ingest.de.sentry.io/4509112010735696",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.use(express.json());

app.use(log);

app.use('/amenities', amenitiesRouter)
app.use('/bookings', bookingsRouter)
app.use('/hosts', hostsRouter)
app.use('/properties', propertiesRouter)
app.use('/reviews', reviewsRouter)
app.use('/users', usersRouter)
app.use('/login', loginRouter)

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});