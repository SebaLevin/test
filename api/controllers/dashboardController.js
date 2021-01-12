const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    
    res.json(users);
};

exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(name)) throw "The Name can contain only alphabets.";

    const emailExist = await User.findOne({ email});

    if (emailExist) throw "User with that email already exists!";

    const user = new User({
        name,
        email,
        password
    });

    await user.save();

    res.json({
        message: "User created succesfully!",
    });
}

exports.deleteUser = async (req, res) => {
    // const { id } = req.params;
    // await User.remove({_id: id})
    // if(!id) {
    //     res.json({
    //         message: "User deleted succesfully!"
    //     })
    // }
    console.log(req.params)
    await User.remove({ _id: req.params.id }, 
       function(err) { 
            if (!err) { 
                console.log('ando'); 
            } 
            else { 
                console.log('no ando'); 
            } 
        }); 
}