//Takes vairable from Heroku (if we dont commit this file, our app wouldnt be able to get the keys from Heroku)
module.exports = {
	apiKey: process.env.APIKEY,
	rootUrl: process.env.ROOTURL
};
