import express from "express";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt"
import cors from "cors"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient();
const app = express();
const port = 4000


app.use(express.json());
app.use(cors())



app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email must be unique' });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Sign up Internal Server Error" });
  }
});


function filterSensitiveInfo(user){
  const{password, ...rest} = user
  return rest
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!validUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }


    const token = jwt.sign({ id: validUser.id }, '1234abcdfhjkk');
    const userInfoWithoutPassword = filterSensitiveInfo(validUser)

    res.cookie("accessToken", token).status(200).json( userInfoWithoutPassword)



  } catch (err) {
    console.error("Error during login:", err); // Log the specific error here
    res.status(500).json({ error: "Server login error", message: err.message });
  }
});



app.listen(port, () => {
  console.log("app is listening in port", port)
})