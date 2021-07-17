const filename = './data/dataOrders.json';
const controller = require('../controllers/ordersController.js');

function getPosts() {
    const posts = controller.retrieveOrders(filename)
    return new Promise((resolve, reject) => {
        if (posts.length === 0) {
            reject({
                message: 'no orders available',
                status: 202 
            })
        }
        resolve(posts)
    })
}

function getPost(id) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, id)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        const id = { id: controller.getNewId(posts) }
        const date = { 
            createdAt: controller.newDate(),
            updatedAt: controller.newDate()
        } 
        newPost = { ...id, ...date, ...newPost }
        posts.push(newPost)
        controller.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function updatePost(id, newPost) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, id)
        .then(post => {
            const index = posts.findIndex(p => p.id == post.id)
            id = { id: post.id }
            const date = {
                createdAt: post.createdAt,
                updatedAt: controller.newDate()
            } 
            posts[index] = { ...id, ...date, ...newPost }
            controller.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function deletePost(id) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, id)
        .then(() => {
            const updatedPosts = posts.filter(p => p.id !== +id);
            controller.writeJSONFile(filename, updatedPosts)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    insertPost,
    getPosts,
    getPost, 
    updatePost,
    deletePost
}