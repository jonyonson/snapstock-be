const sandbox = false;

let IEX_API_KEY, BASE_URL, FLASK_BASE_URL;

if (sandbox) {
  IEX_API_KEY = process.env.IEX_SANDBOX_API_KEY;
  BASE_URL = `https://sandbox.iexapis.com/stable`;
} else {
  IEX_API_KEY = process.env.IEX_CLOUD_API_KEY;
  BASE_URL = `https://cloud.iexapis.com/stable`;
}

if (process.env.NODE_ENV === 'development') {
  FLASK_BASE_URL = 'http://localhost:4000';
} else {
  FLASK_BASE_URL = 'https://snapstock-flask.herokuapp.com';
}

module.exports = { IEX_API_KEY, BASE_URL, FLASK_BASE_URL };
