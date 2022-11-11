const express = require('express');
const User = require('./models/user');
const mongoose = require("mongoose");
const School = require('./models/school');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('./middleware/check-auth');
const app = express()
const Resource = require('./models/resource');
const Tutorial = require('./models/tutorial');

mongoose.connect("mongodb+srv://max:DDu31mUET1tPviXQ@cluster0.losl7ri.mongodb.net/school-help?retryWrites=true&w=majority")
.then(() =>{
  console.log('Connected to database');
})
.catch(()=>{
  console.log('Connection failed');
});

app.use(express.json());
app.use(bodyParser.json());
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
})
//user
app.post("/api/users",(req, res, next)=>{
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const user = new User({
        userID: req.body.userID,
        username: req.body.username,
        password: hash,
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        occupation: req.body.occupation,
        position: req.body.position,
        dateofbirth: req.body.dateofbirth,
        staffid: req.body.staffid,
        schoolID: req.body.schoolID,
        schoolname: req.body.schoolname,
        role: req.body.role,

      });
      user.save()
      .then(result=>{
        console.log(user);
        res.status(200).json({
          message: 'User created',
          result:result
        });
      })
      .catch(err =>{
        res.status(500).json({
          error:err
        });
      });
      });
    });

    //   app.post("/api/admins",(req, res, next)=>{
    //     bcrypt.hash(req.body.password, 10)
    //       .then(hash =>{
    //         const admin = new Admin({
    //           userID: req.body.userID,
    //           username: req.body.username,
    //           password: hash,
    //           fullname: req.body.fullname,
    //           email: req.body.email,
    //           phone: req.body.phone,
    //           staffid: req.body.staffid,
    //           position: req.body.position,
    //           schoolID: req.body.schoolID,
    //           role: req.body.role,

    //         });
    //         admin.save()
    //         .then(result=>{
    //           res.status(200).json({
    //             message: 'Admin created',
    //             result:result
    //           });
    //         })
    //         .catch(err =>{
    //           res.status(500).json({
    //             error:err
    //           });
    //         });
    //         });
    // });

    app.post('/api/users/login',(req,res,next)=>{
      let fetchedUser;
      User.findOne({username:req.body.username})
        .then(user=>{
          if(!user){
            return res.status(401).json({
              message:'Auth failed(1)'
            });
          }
          fetchedUser=user
          return bcrypt.compare(req.body.password, user.password)
        })
        .then(result=>{
          if (!result){
            return res.status(401).json({
              message:'Auth failed(2)'
            });
          }
          const token = jwt.sign(
            {
              userID: fetchedUser.userID,
              username: fetchedUser.username,
              password: fetchedUser.password,
              fullname: fetchedUser.fullname,
              email: fetchedUser.email,
              phone: fetchedUser.phone,
              occupation: fetchedUser.occupation,
              position: fetchedUser.position,
              dateofbirth: fetchedUser.dateofbirth,
              staffid: fetchedUser.staffid,
              schoolID: fetchedUser.schoolID,
              schoolname: fetchedUser.schoolname,
              role: fetchedUser.role,

            },
            'secret_this_should_be_longer',
            {expiresIn: '1h'}
          );
          res.status(200).json({
            token: token,
            user: fetchedUser
          })
        })
        .catch (err =>{
          return res.status(401).json({
            message: 'Auth failed(3)'
          });
        })
    })

    app.post("/api/resources", (req, res, next)=>{
      const resources = new Resource({
        resID: req.body.resID,
        description: req.body.description,
        quantity: req.body.quantity,
        resourceType: req.body.resourceType,
        school: req.body.school,
        status: req.body.status
      });
      resources.save().then(createdResource => {
        console.log(resources)
        res.status(200).json({
          message: 'Resources added success',
          resId: createdResource._id
        });
      });

    });

    app.get('/api/resources', (req,res,next)=>{
      Resource.find().then(documents =>{
        res.status(200).json({
          message: 'Resources fetched success',
          resources:documents
        });
      })
    });
    app.post("/api/tutorials", (req, res, next)=>{
      const tutorials = new Tutorial({
        tutID: req.body.tutID,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        numOfStudents: req.body.numOfStudents,
        studentLevel: req.body.studentLevel,
        status: req.body.status,
        school: req.body.school,

      });
      tutorials.save().then(createdTutorial => {
        console.log(tutorials)
        res.status(200).json({
          message: 'Tutorials added success',
          tutId: createdTutorial._id
        });
      });

    });
    app.get('/api/tutorials', (req,res,next)=>{
      Tutorial.find().then(documents =>{
        res.status(200).json({
          message: 'Tutorials fetched success',
          tutorials:documents
        });
      })
    });

app.get('/api/users',(req,res,next)=>{
  User.find().then(documents => {
    res.status(200).json({
      message: 'User fetched successfully',
      users: documents
    });
  })
});





//school
app.post("/api/schools",(req,res,next)=>{
  const school = new School({
    schoolID: req.body.schoolID,
    schoolname: req.body.schoolname,
    address: req.body.address,
    city: req.body.city,

  });


  //console.log(centre);
  school.save();
  res.status(201).json({
    message: 'schools added successfully'
  });
})

app.get('/api/schools',(req,res,next)=>{
  School.find().then(documents => {
    res.status(200).json({
      message: 'Schools fetched successfully',
      schools: documents
    });
  })
});

module.exports = app;
