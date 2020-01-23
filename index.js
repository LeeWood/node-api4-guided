require('dotenv').config();//b
const server = require('./api/server.js');

const port = process.env.PORT || 5000;//a
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});

//a - we're making it so our PORT is no longer hard coded, it's dynamic.
// for global env vars you can set them on your PC by running `export PORT=5000` or `set PORT=5000 `(mac vs win...just bash?). Also setting a value in case there is no defined PORT var.
//to unset the vars use `unset PORT`
//IF we want our app to use an environment variable in production, we can use an npm module that allows us to do that...".env".
//b - this should be called as high up in the stack as possible. Also, there's no need to ser it to a varible
//So our .env file is automatcally added to the gitignore file BUT you should always make sure that it's on the list. .env files is where you store sensitive information like auth keys and things that you do need in your code, but that you can't have hard coded and hosted in public (hello github).
//When we deploy to Heroku, it doesn't have access to the environment variabled set in our .env file. So it's reading that it needs to get the port from `PORT` variable...but there is none, so it creates one for us. Heroku magic!