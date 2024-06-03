// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Movie, List } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");
const axios = require('axios');

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;



    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
        userId: user._id
    })
})


const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token,
            userId: user._id
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.get("/details", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user details' });
    }
});

router.post("/movies", authMiddleware, async (req, res) => {
    const { title, imdbRating, director, genre, year, actors, poster, playlistName } = req.body;
    const movie = new Movie({ title, imdbRating, director, genre, year, actors, poster, playlistName, userId: req.userId });
    const existingList = await List.findOne({ name: playlistName, userId: req.userId });
    if (!existingList) {
        const newList = new List({ name: playlistName, userId: req.userId });
        await newList.save();
    }
    await movie.save();
    res.status(201).json(movie);
});

router.get("/movies", authMiddleware, async (req, res) => {
    const { playlistName } = req.query;
    console.log("UserID:", req.userId, "PlaylistName:", playlistName);
    const movies = await Movie.find({ userId: req.userId, playlistName: playlistName });
    res.json(movies);
});

router.delete('/movies/:id', authMiddleware, async (req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.params.id, userId: req.userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie removed' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing movie' });
    }
});

router.post("/lists", authMiddleware, async (req, res) => {
    const { name } = req.body;
    const existingList = await List.findOne({ name, userId: req.userId });
    if (existingList) {
        return res.status(409).json({ message: 'Playlist already exists' });
    }
    const newList = new List({ name, userId: req.userId });
    await newList.save();
    res.status(201).json({ _id: newList._id, name: newList.name });
});

router.get("/playlists", authMiddleware, async (req, res) => {
    try {
        const playlists = await List.find({ userId: req.userId }).select('name publicId');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlists' });
    }
});

router.get("/fetch-movie", authMiddleware, async (req, res) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(req.query.title)}&apikey=33cf5764`);
        console.log('Poster URL:', response.data.Poster);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movie from OMDB' });
    }
});

router.get("/playlists/:playlistId", authMiddleware, async (req, res) => {
    try {
        const playlist = await List.findById(req.params.playlistId);
        console.log('Sending playlist data:', playlist);
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist' });
    }
});

router.get("/share-playlist/:publicId", async (req, res) => {
    try {
        const playlist = await List.findOne({ publicId: req.params.publicId });
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }
        // Redirect to a frontend route that can display the playlist
        res.redirect(`/playlist/${playlist._id}`);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching playlist' });
    }
});

router.get("/get-public-id-by-name/:playlistName", async (req, res) => {
    const playlist = await List.findOne({ name: req.params.playlistName });
    console.log('Playlist found:', playlist);  // Log to check the retrieved playlist
    if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json({ publicId: playlist.publicId });
});

module.exports = router;
