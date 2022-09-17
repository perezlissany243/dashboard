
  const checkToken =(req,res,next)=>{
    try {
        const is_valid = jwt.verify(token, process.env.SECRET_TOKEN);
        if (is_valid){
            next() 
        } 
      } catch(err) {
        // err
      }
  }

  module.exports ={ checkToken}