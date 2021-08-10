const User = require('../models/User')
const Post = require('../models/Post')

class PostController {
    // [POST] create post
    async createPost(req, res) {
        const newPost = new Post(req.body)

        try {
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] update post
    async updatePost(req, res) {
        try {
            const post = await Post.findById(req.params.id)

            try {
                if (post.username === req.body.username) {
                    try {
                        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                            $set: req.body
                        }, { new: true })

                        res.status(200).json(updatedPost)
                    } catch (error) {
                        res.status(500).json(error)
                    }
                } else {
                    res.status(401).json("Wrong username")
                }
            } catch (error) {
                res.status(401).json('You can update only your post !')
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }

    // [DELETE delete post
    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.id)

            try {
                if (post.username === req.body.username) {
                    try {
                       await post.delete();

                        res.status(200).json("Post has been deleted !")
                    } catch (error) {
                        res.status(500).json(error)
                    }
                } else {
                    res.status(401).json("Wrong username")
                }
            } catch (error) {
                res.status(401).json('You can delete only your post !')
            }

        } catch (error) {
            res.status(500).json(error)
        }

    }

    // [GET] Post by ID
    async getPost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] all post
    async getAllPost(req, res) {
        const username = req.query.user;
        const catName = req.query.cat;

        try {
            let posts;
            
            if (username) {
                posts = await Post.find({username: username})
            }else if ( catName ) {
                posts = await Post.find({categories: {
                    $in: [catName]
                }})
            } else {
                posts = await Post.find();
            }
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new PostController;