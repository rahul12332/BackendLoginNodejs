const jwt = require("jsonwebtoken")
const User = require('../model/userSchema')

// yaha pe humko jswon web token to compare karna h jo ki chrome pe store hogi

const authenticate = async (req, res, next)=>{
   try {
    const token = req.cookies.jwtoken;          // phale humne chorome se json token get kiya variable token  me or firr
    const verifytoken = jwt.verify(token, process.env.SECRET_KEY) // ab hum token ko apni process.env file ki sectoken key se compare karayinge
    // verifytoken k ander user ki details aagayi hogi or hume verifytoken se abb user ka data get karana h
    
 
    // abb hum us data ko get karinge okey
    const rootUser = await User.findOne({_id:verifytoken._id, "tokens.token":token}) // User ki help se userschema k ander jate h tab humko database ki token ki id or verifytoken ki se match krna h
        // tokens k ander jo token h wo match hona chahiye chrome web k user se
        if(!rootUser){
            res.status.send("user not found")

        }
        req.token = token;
        req.rootUser = rootUser;
        req.UserId = rootUser._id

        next();
        console.log("backend is okey")

   } catch (error) {
    res.status(401).send("unathorized no token provide backend error")
    console.log("unathorized no token provide backend error")
   }
}
module.exports = authenticate