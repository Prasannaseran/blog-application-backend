const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const users = [];
const blogs = [];

app.get("/", (req, res) => res.send("Blog Backend Running Successfully!"));

app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });
  if (users.some(u => u.email === email))
    return res.status(409).json({ message: "Email already registered" });
  users.push({ name, email, password });
  res.status(201).json({ message: "Registration successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid email or password" });
  res.json({ message: "Login successful", name: user.name });
});

app.get("/api/blogs", (req, res) => res.json(blogs));

app.post("/api/blogs", (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author)
    return res.status(400).json({ message: "All fields required" });
  const blog = { id: blogs.length + 1, title, content, author };
  blogs.push(blog);
  res.status(201).json({ message: "Blog created successfully", blog });
});

app.listen(5000, () => console.log("Server running on port 5000"));