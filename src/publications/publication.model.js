import {mongoose,Schema} from "mongoose";

const publicationSchema =mongoose.Schema({
    title:{
        type:String,
        required:[true,"The title is required in the publication"]
    },
    mainText:{
        type:String,
        required:[true,"The main text is required in the publication"]
    },
    category:{
        type:Array,
        required:[true,"The category is required"],
        default:[]
    },
    idUser:{
        type:Schema.Types.ObjectId,
        default:""
    }
});

publicationSchema.method.JSON=function(){
    const {__v,_id,idUser,...publication}=this.toObject();
    publication.uid=_id;
    return publication;
}

export default mongoose.model('Publication',publicationSchema);