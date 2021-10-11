const User = require("../models/User");
const usersControllers = {};

const jwt = require("jsonwebtoken");

usersControllers.sayHi = async (req, res) => {
  console.log(req.decoded)
  res.status(200).json({ message: "hola" });
};

usersControllers.signup = async (req, res) => {
  console.log(req.body)
  const { email, password, role } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "Usuario ya existe!" });
  } else {
    console.log(role)
    const newUser = new User({ email, password, role, cartera:0  });
    await newUser.save();
    res.status(201).json({ message: "Usuario creado", newUser });
  }
};

usersControllers.signin = async (req, res) => {
  //escribimos en el formulario
  const { email, password } = req.body;

  //lo que me devuelve la base de datos
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Usuario no existe" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "La contraseña es incorrecta!" });
  }

  const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, "pato");

  res.status(200).json({ message: "Tu estas logueado correctamente", token, role:user.role, id:user._id });
};

usersControllers.getMoney = async (req,res)=>{
    const user = await User.findById({_id:req.body.id});

    if (!user) {
      return res.status(401).json({ message: "Usuario no existe" });
    }
    let a = user.cartera;

    res.status(200).json(a);

  }

usersControllers.paid = (req,res)=>{
  User.findById({_id:req.body.id}).then((result)=>{
    const user = result;

    if(Number(user.cartera)-req.body.total >=0 ){
      let x = Number(user.cartera) - req.body.total;
      user.cartera = x.toString()
      console.log(x)

      User.findByIdAndUpdate({_id:user._id},user).then((rea)=>{
        res.status(200).json({message:'Actualizacion ejecutada.'})
      }).catch((err)=>{
        console.log(err)
        res.status(402).json({message:'No se a podido actualizar'})
      })

    }else{
      res.status(409).json({message:'No puedes pagar.'})
    }

  }).catch((err)=>{
    return res.status(401).json({ message: "Usuario no existe" });
  })



}

module.exports = usersControllers;
