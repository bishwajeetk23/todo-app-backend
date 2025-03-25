import express from 'express';
import { prismaClient } from './db.config';
const app = express();
app.use(express.json());

const port = process.env.port || 8000;

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "landing page route"
    });
});

app.post('/create_user', async(req,res)=>{
    
    const user_data = await prismaClient.user.create({
        data:{
            email: req.body.email,
            name: req.body.name
        }
    });
    res.status(200).json(user_data);
});

app.get('/get_userId', async(req,res)=>{
    const username = req.body.username;
    const user_data = await prismaClient.user.findUnique({
        where:{
            email:username
        },
        select:{
            id: true
        }
    });
    res.status(200).json(user_data);
    
});

app.post('/add_todo',async(req,res)=>{
    const userId = req.body.userId;
    const title = req.body.title;
    await prismaClient.todo.create({
        data:{
            title,
            userId 
        }
    });
    res.status(200).json({
        message:"Todo added successfully"
    });
});

app.get('/todo_list', async(req,res)=>{
    const userId = req.body.userId;
    const todoList = await prismaClient.todo.findMany({
        where:{
            userId
        },
        select:{
            title: true
        }
    });
    res.status(200).json(todoList);
    
});
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});