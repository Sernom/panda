const axios = require('axios')

class Api {
	constructor(accessToken, options) {
		if (!accessToken)
			throw new error(
				'Cannot instantiate genius-api without an access token'
			)

		let defaults = {}

		this.options = options || defaults

		this.at = accessToken

		this.AuthHeader = { Authentication: 'Bearer ' + this.at }
  }
  
  async request(options) {
    try {
      const response = await axios(options)

      return (JSON.parse(response).response)
    } catch (e) {
      throw new Error(JSON.parse(e.Error.body))
    }
  }

  annotation(id, options) {
    const request = {
      url: 'annotations/' + id,
      qs: options
    }
    return this.request(request)
  }
}

module.exports = {
  Api
}