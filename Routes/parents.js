const { postParent, fetchParentById } = require('../controllers/parents.controllers')

const parentRouter = require('express').Router()

parentRouter.route('/').post(postParent)
parentRouter.route('/:parent_id').get(fetchParentById)
module.exports= parentRouter;