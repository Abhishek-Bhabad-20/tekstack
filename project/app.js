
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Request logging middleware
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.url}`
    );

    next();
});

// Users data
const users = [
    {
        username: "Alwin",
        role: "Admin",
        lastAccess: "2026-10-05"
    },
    {
        username: "Akash",
        role: "User",
        lastAccess: "2026-10-04"
    },
    {
        username: "Rahul",
        role: "User",
        lastAccess: "2026-10-01"
    },
    {
        username: "Priya",
        role: "Manager",
        lastAccess: "2026-09-20"
    },
    {
        username: "Amit",
        role: "User",
        lastAccess: "2026-09-25"
    },
    {
        username: "Sneha",
        role: "Admin",
        lastAccess: "2026-09-30"
    }
];

// Make users available to routes
app.locals.users = users;

// Import routes
const userRoutes = require("./routes/users");

// Use routes
app.use("/api", userRoutes);

// Root route
// Returns users who accessed the system within the last 10 days
app.get("/", (req, res) => {

    const today = new Date();

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const filteredUsers = users.filter((user) => {

        const lastAccessDate = new Date(user.lastAccess);

        return (
            lastAccessDate >= tenDaysAgo &&
            lastAccessDate <= today
        );
    });

    res.json(filteredUsers);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
