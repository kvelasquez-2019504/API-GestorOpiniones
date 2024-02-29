import mongoose,{Schema} from 'mongoose';

const UserSchema = mongoose.Schema({
    nombreUser:{
        type:String,
        required:[true,"El nombre de usuario es obligatorio"]
    },
    correoUser:{
        type:String,
        required:[true, "El correo es obligatorio"]
    },
    password:{
        type:String,
        required:[true, "La clave es obligatoria"]
    },
    comentarios:{
        type:Array,
        default:[]
    }
});

export default mongoose.model('User',UserSchema);