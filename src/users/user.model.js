import mongoose,{Schema} from 'mongoose';

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"]
    },
    userEmail:{
        type:String,
        required:[true, "Email is mandatory"]
    },
    password:{
        type:String,
        required:[true, "The password is mandatory"]
    },
    publications:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    }
});

export default mongoose.model('User',UserSchema);