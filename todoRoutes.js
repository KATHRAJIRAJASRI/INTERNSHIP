const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
