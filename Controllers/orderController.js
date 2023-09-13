import Order from '../Models/Order.js';
import Cart from '../Models/Cart.js';
import User from '../Models/User.js';
import config from 'config';
import Stripe from 'stripe';


const stripeAPIKey=config.get('StripeAPIKey');
const stripeInstance=Stripe(stripeAPIKey);

export const get_orders=async(req,res)=>{
    const userId=req.params.id;
    try{
        const orders=await Order.find({userId}).sort({date:-1});
        res.json(orders);
    } catch(err){
        res.status(500).send("Something went wrong");
    }
}
export const checkout=async(req,res)=>{
    try{
        const userId=req.params.id;
        const {source}=req.body;
        const cart=await Cart.findOne({userId});
        const user=await User.findOne({_id:userId});
        const email=user.email;

        if(cart){
            const charge=stripeInstance.charges.create({
                amount:cart.bill,
                currency:'inr',
                source:source,
                receipt_email:email
            })
            if(!charge) throw Error('Payment failed');
            if(charge){
                const order=await Order.create({
                    userId,
                    items:cart.items,
                    bill:cart.bill
                });
                await Cart.findByIdAndDelete({_id:cart.id});
                return res.status(201).send(order);
            }
        } else{
            res.status(500).send("There are no items in the cart");
        }
    } catch (err){
        console.log(err);
        res.status(500).send("Something went wrong");

    }
}

