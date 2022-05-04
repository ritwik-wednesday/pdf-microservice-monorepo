import express from 'express';
import dotenv from 'dotenv';
import rTracer from 'cls-rtracer';
import { isTestEnv, logger } from '@utils/index';
import cluster from 'cluster';
import os from 'os';
import 'source-map-support/register';
import { generatePDF } from './services/generatePDF.js';
import { sendSESEmailWithAttachments } from './services/ses';
import uniqid from 'uniqid';
import templates from './utils/templates.js';

const totalCPUs = os.cpus().length;

let app;
export const init = () => {
  // configure environment variables
  dotenv.config({ path: `.env.${process.env.ENVIRONMENT_NAME}` });

  if (!app) {
    app = express();
  }

  app.use(express.json());
  app.use(rTracer.expressMiddleware());

  app.use('/pdf', async (req, res) => {
    const template = templates[req.body.templateId](req.body.templateArgs);
    const pdf = await generatePDF(template);

    res.set('Content-Type', 'application/pdf');
    res.send(pdf);
  });

  app.use('/email', async (req, res) => {
    const pdfs = await Promise.all(
      req.body.pdfs.map(pdfData => {
        const template = templates[pdfData.templateId](pdfData.templateArgs);
        return generatePDF(template);
      })
    );

    const attachments = pdfs.map(pdf => ({
      filename: `${uniqid()}.pdf`,
      content: pdf
    }));
    const mailOptions = {
      from: req.body?.from || 'ritwik@wednesday.is',
      to: req.body?.toAddresses || 'ritwik@wednesday.is',
      cc: req.body?.cc || 'ritwik@wednesday.is',
      subject: req.body?.subject || 'Subject',
      text: req.body?.message || 'Message',
      replyTo: req.body?.replyTo || 'ritwik@wednesday.is',
      attachments
    };

    const response = await sendSESEmailWithAttachments(mailOptions);
    res.send(response);
  });

  app.use('/', (req, res) => {
    const message = 'Service up and running!';
    logger().info(message);
    res.json(message);
  });

  /* istanbul ignore next */
  if (!isTestEnv()) {
    app.listen(9000);
  }
};

logger().info({ ENV: process.env.NODE_ENV });

if (!isTestEnv() && cluster.isMaster) {
  console.log(`Number of CPUs is ${totalCPUs}`);
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  init();
}

export { app };
