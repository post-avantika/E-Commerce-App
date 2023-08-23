import mongoose from 'mongoose';
import {Schema} from 'mongoose';

//creating order collection schema
const OrderSchema=new Schema({
    userId:{
        type:String,
        
    },
    items:[{
        productId:{
            type:String,
            
        },
        name:{
            type:String,
            
        },
        quantity:{
            type:Number,
            required:true,
            min:[1,'Quantity can\'t be less than 1']
        },
        price:{
            type:Number
            
        }
    }],
    bill:{
        type:Number,
        required:true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
});

//export Order Model

const Order=mongoose.Model('order',OrderSchema);
export default Order;