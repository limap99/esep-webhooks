const axios = require("axios");
const { LambdaLoggers } = require("aws-lambda-helper");
const logger = new LambdaLoggers();

exports.handler = async (event, context) => {
  try {
    const json = JSON.parse(event.body);
    const { issue } = json;
    const payload = {
      text: `Issue Created: ${issue.html_url}`,
    };
    const response = await axios.post(process.env.SLACK_URL, payload);
    logger.log(response.data);
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};