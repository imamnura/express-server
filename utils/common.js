const express = require("express");

const responseTemplate = ({ code, success, data, message }) => ({
  code,
  success,
  data,
  message,
});

const responseHandler = (res, statusCode, success, data, message) => {
  res
    .status(statusCode)
    .send(responseTemplate({ code: statusCode, success, data, message }));
};

module.exports = {
  responseHandler,
};
