import mongoose from'mongoose';
const userSchema = new mongoose.Schema({
  email: String,
  user_id: String,
  password:String,
  
});
export default  mongoose.model("User", userSchema);
