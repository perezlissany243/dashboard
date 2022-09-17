const User = require("./schema/user")

const createUser = async (_user)=>{
    const user = new User(_user)
    user.save() 
}

const getUser = async (_user)=>{
    const user = await User.find()
    return user
}

const getlogin =async (_user)=>{
    const user = await User.find({"email":_user.email,"password":_user.password})
    return user
}

const check_user_exist =async (email)=>{
    const user = await User.find({"email":email})
    return user
}


const userEmployee =async (id)=>{
    const user = await User.find({"parent_id":id})
    return user
}
const deleteEmployee =async (user_id,id)=>{
    const user = await User.remove({"_id":id,"parent_id":user_id})
    return user
}

module.exports ={ createUser,getUser,getloginModel:getlogin,userEmployee,deleteEmployee,check_user_exist}