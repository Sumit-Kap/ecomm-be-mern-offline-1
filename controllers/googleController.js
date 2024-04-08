const userService = require("../service/userService");
const axios = require("axios");
const googleController = {
    handleCallback: async (req, res, next) => {
        const { code, scope } = req.query;

        const response = await axios.post('https://oauth2.googleapis.com/token', {
            
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code',
        })

        const { access_token } = response.data;
       
        const results = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
           headers:{ Authorization: `Bearer ${access_token}` }
        });
        console.log("results", results);
        res.cookie('session-cookie', access_token);
        res.redirect('http://localhost:3000/');
        res.status(200).send(results);
    },
    initGoogleAuth: (req,res, next) => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
        res.json({ url: url})
        // res.redirect(url);
    }
//    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;

}

module.exports = googleController;