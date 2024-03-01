import {mongoose,Schema} from "mongoose";

const publicationSchema =Schema({
    title:{
        type:String,
        required:[true,"The title is required in the publication"]
    },
    mainTitle:{
        type:String,
        required:[true,"The main text is required in the publication"]
    },
    category:{
        type:Array,
        required:[true,"The category is required"],
        default:[]
    },
    idUser:{
        type:mongoose.Type.ObjectId,
        default:""
    }
});

PublicationSchema.method.JSON=function(){
    const {__v,_id,idUser,...publication}=this.toObject();
    publication.uid=_id;
    return publication;
}

export default publicationSchema;