import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PWD,
    database: process.env.DB
});
function authenticateToken(req,resp,next){
    const authHdr = req.headers['authorization'];
    const token = authHdr && authHdr.split(' ')[1];
    if(!token){
        return resp.sendStatus(401);
    }
    jwt.verify(token,process.env.ACCESS_TOKEN,(error, user) => {
        if(error){
            return resp.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
app.get('/',authenticateToken,(req,resp) => {
    try {
        db.query('SELECT * from user',(error, res) => {        
            if(error){
                resp.json({ Message: 'No data found' });
            }
            else{
                resp.json(res);
            }
        });
    } catch (error) {
        resp.json({ Message: error });
    }
});
app.get('/:id',authenticateToken,(req,resp) => {
    try {
        db.query('SELECT * from user u WHERE u.id = ?',[req.params.id],(error, res) => {        
            if(error){
                resp.json({ Message: 'No data found' });
            }
            else{
                resp.json(res);
            }
        });
    } catch (error) {
        resp.json({ Message: error });
    }
});
app.post('/New', (req,resp) => {
    const { name, email, pwd } = req.body;
    if(name && email && pwd){
        try {
            console.log("here");
            const hashedPwd = bcrypt.hashSync(pwd, 10);
            db.query('INSERT INTO user(name, email, pwd) VALUES (?,?,?)',[name,email,hashedPwd],(error, res) => {        
                if(error){
                    resp.json({ Message: 'No data found' });
                }
                else{
                    resp.json(res);
                }
            });
            console.log('Added succefully!');
        } catch (error) {
            resp.json({ Message: error });
        }
    }
    else{
        console.log('Incomplete data');
    }
})
app.put('/Update/:id',authenticateToken, (req,resp) => {
    const { name, email } = req.body;
    if(name && email){
        try {
            db.query('UPDATE user u SET u.name = ?, u.email = ? WHERE u.id = ?',[name,email,req.params.id],(error, res) => {        
                if(error){
                    resp.json({ Message: 'No data found' });
                    
                }
                else{
                    resp.json({ Message: 'Updated succefully!' });
                }
            });
        } catch (error) {
            resp.json({ Message: error });
        }
    }
    else{
        console.log('Incomplete data');
    }
})
app.delete('/:id',authenticateToken, (req,resp) => {
    try {
        const result = db.query('DELETE from user u WHERE u.id = ?',[req.params.id]);
        if (err) {
            return resp.status(500).json({ Message: 'Delete failed' });
        }
        resp.json({ Message: 'User deleted successfully' });
        } 
    catch (error) {
        console.log('error: ',error);
    }
})
app.post('/Login',(req,resp) => {
    const { email, pwd } = req.body;
    if(email && pwd){
        try {
            console.log('email: ',email,' | pwd: ',pwd);
            db.query('SELECT * FROM user u WHERE u.email LIKE ?',[email],(err,result) => {
                if(result.length > 0){
                    const usr = result[0];
                    if(bcrypt.compareSync(pwd, usr.pwd)){
                    const access_token = jwt.sign({ id : usr.id, email: usr.email },process.env.ACCESS_TOKEN, { expiresIn: '1h' });
                    resp.json({Message: 'Welcome back!', accessToken: access_token });
                    }
                    else{
                        resp.json({Message : 'Pwd Incorrect!!', test: false});
                    }
                }
                else{
                    resp.status(404).json({ Message: 'No user found with the given email' });
                }
            }); 
        }
        catch (error) {
            console.log('Error: ',error);
        }
    }
})
app.post('/Signup', (req,resp) => {
    const { name, email, pwd } = req.body;
    if(name && email && pwd){
        try {
            console.log("here");
            const hashedPwd = bcrypt.hashSync(pwd, 10);
            db.query('INSERT INTO user(name, email, pwd) VALUES (?,?,?)',[name,email,hashedPwd],(error, res) => {        
                if(error){
                    resp.json({ Message: 'No data found' });
                }
                else{
                    resp.json({ Message: 'Account created successfully' });
                }
            });
            console.log('Added succefully!');
        } catch (error) {
            resp.json({ Message: error });
        }
    }
    else{
        resp.json({ Message: 'Incomplete data' });
    }
})
app.listen(port,() => {
    if(port){
        console.log(`Server Running on port ${port}...`);
    }
    else{
        console.log("Couldn't run server");
    }
})