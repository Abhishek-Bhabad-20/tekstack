
const express = require("express");

const router = express.Router();

// Get all users
router.get("/users", (req, res) => {

    const users = req.app.locals.users;

    res.json(users);
});

// Get users who accessed within the last 10 days
router.get("/users/recent", (req, res) => {

    const users = req.app.locals.users;

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

// Get user by username
router.get("/users/:username", (req, res) => {

    const users = req.app.locals.users;

    const username = req.params.username;

    const user = users.find(
        (user) =>
            user.username.toLowerCase() === username.toLowerCase()
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

module.exports = router;
