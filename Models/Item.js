import mongoose from 'mongoose';
import {Schema} from 'mongoose';


//creating item collection schema
const ItemSchema=new Schema({
    item_name:{
        type:String,
        required:true
    },
    item_description:{
        type:String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date_added: {
        type: Date,
        default: Date.now
    },

});

// export Item model
const Item=mongoose.Model('item',ItemSchema);
export default Item;