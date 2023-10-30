import express from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import cors from "cors"

const prisma = new PrismaClient();
const app = express();
const port  = 4000


app.use(express.json());
app.use(cors())



app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {

    const existingUser = await prisma.user.findUnique({
      where:{
        email
      }
    })

    if(existingUser){
      return res.status(400).json({ error: 'Email must be unique' });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashPassword,
      },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Sign up Internal Server Error" });
  }
});



app.listen(port,()=>{
  console.log("app is listening in port", port)
})