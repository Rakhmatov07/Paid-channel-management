const { fetchOne, fetch } = require("../../libs/pg");
const validatePost = require("../../libs/validation/post.validation");

const createPost = async(req, res) => {
    try {
        const {title, text} = req.body;
        const user_id = req.user;
        const {channel_id} = req.params;

        const isValid = validatePost(title, text);
        if(isValid) return res.status(400).json({msg: isValid});

        const newPost = await fetchOne('INSERT INTO posts(title, text, user_id, channel_id) VALUES($1, $2, $3, $4) RETURNING*;', title, text, user_id, channel_id);

        return res.status(201).json({msg: 'Created', newPost});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const updatePost = async(req, res) => {
    try {
        const {title, text} = req.body;
        const {post_id} = req.params;
        console.log(title, text);

        const post = await fetchOne('SELECT * FROM posts WHERE post_id=$1;', post_id);
        if(!post) return res.status(404).json({msg: 'Post Not Found'});

        const updPost = await fetchOne('UPDATE posts SET title=$1, text=$2 WHERE post_id=$3 RETURNING*;', title || post.title, text || post.text, post_id);
        
        return res.status(201).json({msg: 'Created', updPost});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const deletePost = async(req, res) => {
    try {
        const {post_id} = req.params;

        const post = await fetchOne('SELECT * FROM posts WHERE post_id=$1;', post_id);
        if(!post) return res.status(404).json({msg: 'Post Not Found'});

        const deletedPost = await fetchOne('DELETE FROM posts WHERE post_id=$1 RETURNING*;', post_id);
        
        return res.status(200).json({msg: 'Successfully deleted', deletedPost});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'Internal Server Error'});
    }
};

const getPosts = async(req, res) => {
    try {
        const {channel_id} = req.params;

        const posts = await fetch('SELECT * FROM posts WHERE channel_id=$1;', channel_id);
        if(!posts) return res.status(404).json({msg: 'No posts yet'});

        return res.status(200).json({msg: 'Success', posts});
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json({msg: 'Internal Server Error'});       
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getPosts
};


