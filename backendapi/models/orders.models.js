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

function getPost(OrderId) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, OrderId)
        .then(post => resolve(post))
        .catch(err => reject(err))
    })
}

function insertPost(newPost) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        const OrderId = { OrderId: controller.getNewId(posts) }
        const date = { 
            createdAt: controller.newDate(),
            updatedAt: controller.newDate()
        } 
        newPost = { ...OrderId, ...date, ...newPost }
        posts.push(newPost)
        controller.writeJSONFile(filename, posts)
        resolve(newPost)
    })
}

function updatePost(OrderId, newPost) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, OrderId)
        .then(post => {
            const index = posts.findIndex(p => p.OrderId == post.OrderId)
            OrderId = { OrderId: post.OrderId }
            const date = {
                createdAt: post.createdAt,
                updatedAt: controller.newDate()
            } 
            posts[index] = { ...OrderId, ...date, ...newPost }
            controller.writeJSONFile(filename, posts)
            resolve(posts[index])
        })
        .catch(err => reject(err))
    })
}

function deletePost(OrderId) {
    return new Promise((resolve, reject) => {
        const posts = controller.retrieveOrders(filename);
        controller.mustBeInArray(posts, OrderId)
        .then(() => {
            const updatedPosts = posts.filter(p => p.OrderId !== +OrderId);
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