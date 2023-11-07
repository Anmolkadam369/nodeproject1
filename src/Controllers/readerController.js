let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const readerModel = require("../Models/readerModel");

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    //8-15 characters, one lowercase letter and one number and maybe one UpperCase & special character:
    return /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,15}$/.test(password);
  };


// Create a new book
const registerReader = async function (req, res) {
    try {
        let data = req.body;
        let { firstName, lastName, age, email, password } = data;
        //body
        if (Object.keys(data).length == 0)
            return res.status(400).send({ msg: "data is mandatory" });

        if (!firstName)
            return res
                .status(400)
                .send({ status: false, message: "firstName is required" });

        if (firstName == "")
            return res
                .status(400)
                .send({ status: false, message: "Please Enter firstName value" });

        if (typeof firstName != "string")
            return res
                .status(400)
                .send({ status: false, message: "firstName should be in String" });

        if (!lastName)
            return res
                .status(400)
                .send({ status: false, message: "lastName is required" });

        if (lastName == "")
            return res
                .status(400)
                .send({ status: false, message: "Please Enter lastName value" });

        if (typeof lastName != "string")
            return res
                .status(400)
                .send({ status: false, message: "lastName should be in String" });

        if (!age)
            return res
                .status(400)
                .send({ status: false, message: "age is required" });

        if (age == "")
            return res
                .status(400)
                .send({ status: false, message: "Please Enter age value" });

        if (typeof age != "number")
            return res
                .status(400)
                .send({ status: false, message: "age should be in number" });

        if (!email)
            return res
                .status(400)
                .send({ status: false, message: "email is required" });

        if (email == "")
            return res
                .status(400)
                .send({ status: false, message: "Please Enter email value" });
        let foundEmail = await readerModel.findOne({email:email});
        if(foundEmail)
        return res
                .status(400)
                .send({ status: false, message: "this email already registered" });

        if (!validateEmail(email))
            return res
                .status(400)
                .send({ status: false, message: "Please Enter valid email value" });
        if (typeof email != "string")
            return res
                .status(400)
                .send({ status: false, message: "email should be in String" });

                if(!password) 
                return res.status(400).send({status: false, message: "password is required"});
          
               if(typeof(password) != "string")
                return res.status(400).send({status: false, message: "password should be in String"});
          
              if (password == "")
                return res.status(400).send({ status: false, message: "Please Enter password value" });

                if (!validatePassword(password))
        return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });
  
          
              //hashing password 
              let hashing = bcrypt.hashSync(password, 10);
             password= data.password = hashing; 


        const createData = await readerModel.create(data);
        res.status(201).send({ msg: createData });
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message });
    }
};


const loginReader = async(req,res)=>{
    try{
      let loginData = req.body;
      let{email, password} = loginData;
      //________________________________________________________
      if (!email)
        return res.status(400).send({ status: false, message: "email is mandatory" });
      if(typeof(email) != "string"){
        return res.status(400).send({status: false, message:" please send proper email"})
      }
      email = loginData.email = email.trim().toLowerCase();
      if(email == "")
        return res.status(400).send({status: false, message:" please send proper email"})
  //_____________________________________________________
      
       if (!password)
        return res.status(400).send({ status: false, message: "password is mandatory" });
  
      if (typeof password != "string")
        return res.status(400).send({ status: false, message: "please provide password in string " });
  
      password = loginData.password = password.trim();
      if (password == "")
        return res.status(400).send({ status: false, message: "Please provide password value" });
  
      //regex password
      if (!validatePassword(password))
        return res.status(400).send({ status: false, message: "8-15 characters, one lowercase letter, one number and maybe one UpperCase & one special character" });
  
  //_____________________________________________________
      let isPersonExist = await readerModel.findOne({email:email})
      if(!isPersonExist) return res.status(404).send({status:false, message:"Email doesn't exists "})
      console.log(isPersonExist)
  
      let passwordCompare = await bcrypt.compare(password, isPersonExist.password)
      console.log(passwordCompare);
    if(!passwordCompare) 
      return res.status(404).send({status:false, message:"password doesn't match"});

      let token = jwt.sign(
        {_id : isPersonExist._id,  exp: Math.floor(Date.now() / 1000) + 86400}, "project");
  
      res.setHeader('x-api-key', token)
              
        //__________________________________________________________________
      return res.status(200).send({ status: true, message: `reader login successfully`, token: token});
  }
  catch(error){
    return res.status(500).send({status:false, message:error.message})
  }
  } 

module.exports ={registerReader,loginReader};