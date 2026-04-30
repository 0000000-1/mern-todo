import User from "../routes/authRoutes.js";

export async function login(req, res) {
  try {
    
  } catch (error) {}
}

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const getEmail = await User.findOne({ email });

    if (getEmail) {
      return res.status(400).json({ message: "email already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username:username,email:email,password:hashPassword
    })

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
    return res.json({ token, user: { id: user._id, username: user.username, email: user.email } }) 
  } catch (error) {
    console.log("no results");
  }
}
