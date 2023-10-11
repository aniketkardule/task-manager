
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import { ObjectId } from 'mongodb';


const registerUser = async (req, res) => {

       const { name, email, password} = req.body;
       const user = await User.findOne({email});

       if(user){
              res.status(403).json({message:" Forbidden User already exists!"});
       }else{
              const newUser = await User.create({
                     name,
                     email,
                     password,
                     tasks:[]
              });

              if (newUser) {
                     generateToken(res, newUser._id)
                     res.status(201).json({
                            name:newUser.name,
                            email:newUser.email,
                            tasks:newUser.tasks
                     });
              } else {
                     res.status(500);
                     throw new Error('Invalid user data');
              }
       }

       

}

const loginUser = async (req, res) => {
       const { email, password} = req.body;
       const user = await User.findOne({email});

       if(user && (await user.matchPassword(password)) ){
              generateToken(res, user._id);
              res.status(200).json({
                     name:user.name,
                     email:user.email,
                     tasks:user.tasks
              })
       }else{
              res.status(500).json({message:"Invalid Credentials!"});
       }
}


const getUser = async (req, res) => {
       try{
              console.log(req.user._id);
              const user = await User.findById(req.user._id);
              if(user){
                     res.status(200).json(user);
              }else{
                     res.status(404).json({message:"Not Found"});
              }
       }catch(e){
              console.log(e);
       }
       
       
}

const updateUser = async (req,res) => {
       const { name, email, password} = req.body;
       const user = await User.findById(req.user._id);

       if(user){
              user.name = name || user.name;
              user.email = email || user.email;
              user.password = password || user.password;

              const updatedUser = await user.save();
              res.status(201).json({name:updatedUser.name,email:updatedUser.email,tasks:updatedUser.tasks});
       }else{
              res.status(404).json({message:'User not found!'});
       }

}

const logoutUser = async (req, res) => {
       try {
           res.cookie("jwt","", {
              httpOnly:true,
              expires: new Date(0)
           })   
           res.status(200).json({message:'Logged out successfully'})

       } catch (error) {
              res.status(500).json({message:error});
       }   
}

const deleteUser = async (req, res) => {

       const password = req.query.password;

       const user = await User.findById(req.user._id);

       if(user && (await user.matchPassword(password))){
              res.cookie("jwt","", {
                     httpOnly:true,
                     expires: new Date(0)
                  })   
              const deletedUser = await User.deleteOne({_id:user._id})
              res.status(200).json({message:'User deleted',user:deletedUser});
       }else{
              res.status(404).json({message:'User not found!'});
       }
}

const createTask = async (req,res) => {
       try {
              const { task_name, start_date, end_date, status } = req.body;
              const user = await User.findById(req.user._id);
              if(user){
                     user.tasks.unshift({
                            task_name,
                            start_date,
                            end_date,
                            status
                     });

                     const updatedUser = await user.save();
                     res.status(201).json({name:updatedUser.name,email:updatedUser.email,tasks:updatedUser.tasks});
              }
       } catch (error) {
              res.status(500).json({message:error});
       }
}

const updateTask = async (req, res) => {
       try{
              const { task_id, task_name, start_date, end_date, status } = req.body;
              const user = await User.findById(req.user._id);

              if(user){
                     var tasks = user.tasks;
                     var foundIndex = tasks.findIndex(x => x._id == task_id);
                     tasks[foundIndex] = {
                            _id:tasks[foundIndex]._id,
                            task_name:task_name || tasks[foundIndex].task_name,
                            start_date:start_date || tasks[foundIndex].start_date,
                            end_date:end_date || tasks[foundIndex].end_date,
                            status:status || tasks[foundIndex].status
                     }
                     const updatedTask = await user.save();

                     if(updatedTask){
                            res.status(200).json({name:user.name,email:user.email,tasks:user.tasks});
                     }else{
                            res.status(500).json({message:"Server Error!"});
                     }
              }
       }catch (e){
              res.status(500).json({message:e});
       }
}

const deleteTask = async (req, res) => {
       try {
              const task_id = req.query.task_id;
              const user = await User.findById(req.user._id);
              var tasks = user.tasks;
              var foundIndex = tasks.findIndex(x => x._id == task_id);
              tasks.splice(foundIndex, 1);
              const upadtedUser = await user.save();
              res.status(200).json({name:upadtedUser.name,email:upadtedUser.email,tasks:upadtedUser.tasks});
       } catch (error) {
              res.status(500).json({message:error});
       }
}

export { registerUser, loginUser, updateUser, deleteUser, getUser, logoutUser, createTask, updateTask, deleteTask };

