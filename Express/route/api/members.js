const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

//gets all members
router.get('/',(req,res)=>{                   //whenever we write (localhost://5000/api) at that time whole json file will be display
    res.json(members);
})

//get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));   //some method gives the true OR false value. if id is available then it gives true otherwise it gives false.
if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
}
else{
    res.status(400).json({msg : `your requested id ${req.params.id} is not available`});
}
});

//Create Member
router.post('/',(req,res)=>{
    // res.send(req.body);        //in this json data will be display which we created in postman.

    const newMember = {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg:"please include the name and email"})
    }
members.push(newMember);
res.json(members);
// res.redirect('/');
});


//update member
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));   //some method gives the true OR false value. if id is available then it gives true otherwise it gives false.
if(found){
    const updMember = req.body;
    members.forEach(member => {
        if(member.id = parseInt(req.params.id)){
            member.name = updMember.name ? updMember.name : member.name;
            member.email = updMember.email ? updMember.email : member.email; 
        
            res.json({msg:"member updated",member,members});
            
        }
    })
}
else{
    res.status(400).json({msg : `your requested id ${req.params.id} is not available`});
}
});

//Delete member
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));   //some method gives the true OR false value. if id is available then it gives true otherwise it gives false.
if(found){
    res.json({
        msg:`member with id:${req.params.id} deleted`,
        members: members.filter(member => member.id !== parseInt(req.params.id))
    });
}
else{
    res.status(400).json({msg : `your requested id ${req.params.id} is not available`});
}
});


module.exports = router;

