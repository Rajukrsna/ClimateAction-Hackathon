import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
//import passport from "./config/passport.js"; // ✅ Import Passport.js
import connectDB from "./config/db.js"; // ✅ Import MongoDB connection
import userRoutes from "./routes/userRoutes.js"; // ✅ Import user routes
//import MongoStore from "connect-mongo"; // ✅ Use MongoDB for session storage

dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Change to deployed frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true, 
  })
);

// ✅ Session middleware for Passport (Uses MongoDB Store)
//app.use(
  //session({
  //  secret: process.env.SESSION_SECRET || "your-secret-key", // ⚠️ Use a strong secret in .env
  //  resave: false,
   /// saveUninitialized: false,
   // store: MongoStore.create({
   //   mongoUrl: process.env.MONGO_URI, // ✅ Use MongoDB for storing sessions
    //  collectionName: "sessions",
   // }),
   /// cookie: { secure: false, httpOnly: true }, // Set secure: true if using HTTPS
  //})
//);

// ✅ Initialize Passport
//app.use(passport.initialize());
//app.use(passport.session());

app.use("/api/users", userRoutes);


// ✅ Google Auth Routes
//app.get(
 // "/auth/google",
 // passport.authenticate("google", { scope: ["profile", "email"] })
//);

//app.get(
  //"/auth/google/callback",
  //passport.authenticate("google", {
  //  successRedirect: process.env.FRONTEND_URL + "/dashboard", // ✅ Redirect to frontend
   // failureRedirect: process.env.FRONTEND_URL + "/login", // ✅ Redirect if login fails
 // })
//);

// ✅ Logout Route
app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
