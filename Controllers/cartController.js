import Cart from '../Models/Cart';
import Item from '../Models/Item';

export const get_cart_items= async(req,res)=>{
    const userId=req.params.id;
    try{
        let cart=await Cart.findOne({userId});
        if(cart && items.length>0){
            res.send(cart);

        } else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send('Something went wrong');
    }
}

export const add_cart_item=async(req,res)=>{
    const userId=req.params.id;
    const {productId,quantity}=req.body;
    try{
      let cart=await Cart.findOne({userId});
      let item=await Item.findOne({_id:productId});
      if(!item){
        res.status(404).send("Item not found.")
      }
      const name=item.item_name;
      const price=item.price;

      if(cart){
        let itemIndex=cart.items.findIndex(productId);
        if(itemIndex>-1){
          let productItem=cart.items[itemIndex];
          productItem.quantity+=quantity;
          productItem.price+=price;

        } else{
          cart.items.push(productId,name,quantity,price)
        }
        cart.bill+=quantity*price;
        cart= await cart.save();
        return res.status(201).send(cart);

      } else{
        const newCart=await Cart.create({userId,
        items:[{productId, name, quantity, price}],
        bill:quantity*price});
        return res.status(201).send(newCart);
      }
    } catch(err){
      console.log(err);
      res.status(500).send("Something went wrong");
    }
};

export const delete_item=async(req,res)=>{
  const userId=req.params.userId;
  const productId=req.params.id;
  try{
    let cart=await Cart.findOne({userId});
    let itemIndex=cart.items.findIndex({productId});
    if(itemIndex>-1){
        let productItem=cart.items[itemIndex];
        cart.bill -=productItem.quantity * productItem.price;
        cart.items.splice(itemIndex,1);
    }
    cart=await cart.save();
    return res.status(201).send(cart);
  } catch (err){
    console.log(err);
    res.status(500).send("Something went wrong")
  }
}