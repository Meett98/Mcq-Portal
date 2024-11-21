export const ResponseBody = (statusCode, message, response, data = null, error = null) => {
    const responseBody = {
      statusCode,
      message,
    };
  
    if (data) responseBody.data = data;
    if (error) responseBody.error = error;
  
    return response.status(statusCode).json(responseBody);
  };