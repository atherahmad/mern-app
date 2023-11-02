import jwt from 'jsonwebtoken'
const authorizationHandler = async(req, res, next)=> {

    try {

        // Checking the request object to find the cookies
        console.log(req.cookies['mern-cookie'])
        // Taking out the token from cookie or from authorization property
        const token = req.cookies['mern-cookie'] || req.headers.authorization?.split(' ')[1] 
        console.log(token);

        // Verifying the token here 
        const payload = jwt.verify(token, process.env.SECRET_KEY)
    
        console.log(payload);

        // If request is an object how can we attach a new property to it?

        req.userId = payload.userId
        next()
    }
    catch(error){
        
        next(error)
    }
}
export default authorizationHandler