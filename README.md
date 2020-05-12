## Installing dependecies...
npm install for both server and client(cd - /client).

## Changes to consider
engines in package.json in server,
histry.push in AuthContextProvider (in useLayout)

## Add .env file
to hide credentials.
{
 "MONGODB_URI",
 "jwtSecretKey"
}

## Hashing password
here we used bcryptjs package. If you need bcrypt, just changed it.  

## For new creation like boilerplate (helps in push)
first remove git in client folder (using rm -rf .git).

