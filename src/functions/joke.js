'use strict'
const fetch = require('node-fetch')

const API_ENDPOINT = 'https://icanhazdadjoke.com/'

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => ({
      statusCode: response.statusCode || 200,
      body: response.json().joke,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }))
}
