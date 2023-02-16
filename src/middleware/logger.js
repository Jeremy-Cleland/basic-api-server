'use strict';

const logger = (req, res, next) => {
  console.log(`Request: ${req.method}`);
  next();
};

module.exports = logger;
