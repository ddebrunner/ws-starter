'use strict'
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  console.log('BODY')
  console.log(event.body)
  console.log('---')

  return fetch(process.env.SZ_DM_URL, {
    headers: {
      'content-type': 'application/json',
      Authorization: 'apikey ' + process.env.SZ_API_KEY,
    },
    method: 'POST',
    body: event.body,
  })
    .then((response) => {
      console.log('RESPONSE')
      console.log(response.json())
      console.log('---')
      console.log(response.statusCode)
      return response.json()
    })
    .then((data) => ({
      statusCode: 200,
      body: data,
    }))
    .catch((error) => ({
      statusCode: 422,
      body: `Oops! Something went wrong. ${error}`,
    }))
}
