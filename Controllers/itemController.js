import Item from '../Models/Item';

export const get_items=(req,res)=>{
    Item.find().then(items=>res.json(items));
}

export const post_item=(req,res)=>{
    const newItem=new Item(req.body);
    newItem.save().then(item=>res.json(item));
} 

export const update_item=(req,res)=>{
    Item.findByIdAndUpdate({_id:req.params.id},req.body).then(item=>{
        Item.findOne({_id:req.params.id}).then(item=>{
            res.json(item);
        })
    })
}

export const delete_item=(req,res)=>{
    Item.findByIdAndDelete({_id:req.params.id}).then(item=>{
        res.json(item);
    })
}