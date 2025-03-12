import mongoose from'mongoose';

const postSchema = new mongoose.Schema({
  user_email : String,
  userId : String,
  user_pasword : String,
  full_name: String,
  contact1: Number,
  contact2: Number,
  main_loca:String,
  exact_loca: String,
  price:Number,
  discription:String,
  //images: [String],
   g_map_url:String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default  mongoose.model('Post', postSchema);