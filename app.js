const express = require("express");

const app = express();

// Configurable port
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

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

// Request logging middleware
app.use((req, res, next) => {
    console.log(
        `${new Date().toISOString()} - ${req.method} ${req.url}`
    );

    next();
});

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "User Tracking REST API is running"
    });
});

// Get all users
app.get("/api/users", (req, res) => {
    res.json(users);
});

// Get users who accessed the system within the last 10 days
app.get("/api/users/recent", (req, res) => {

    const today = new Date();

    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const recentUsers = users.filter((user) => {

        const lastAccessDate = new Date(user.lastAccess);

        return lastAccessDate >= tenDaysAgo && lastAccessDate <= today;
    });

    res.json({
        count: recentUsers.length,
        users: recentUsers
    });
});

// Get user by username
app.get("/api/users/:username", (req, res) => {

    const username = req.params.username;

    const user = users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
