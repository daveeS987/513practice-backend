'use strict';

export default (req, res, next) => {
  req.requestTime = new Date().toString();
  console.log(req.method, req.path);
  console.log('Request Time: ', req.requestTime);
  next();
};
