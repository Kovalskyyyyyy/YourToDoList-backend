const express = require('express');
const router = express.Router();
const { createList, getLists, updateList, deleteList } = require('../controllers/listController');

router.post('/', createList);
router.get('/', getLists);
router.put('/:id', updateList);
router.delete('/:id', deleteList);

module.exports = router;
