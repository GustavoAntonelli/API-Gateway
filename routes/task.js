import express from 'express';
import taskService from '../services/taskService.js';
import authenticateToken from '../services/authentication.js'
var router = express.Router();

router.post('/create', authenticateToken, async function(req, res, next) {
  res.send(await taskService.createTask(req.body));
});

router.get('/getAll', authenticateToken, async function(req, res, next) {
  res.send(await taskService.getTasks(req.query.userId));
});

router.get('/:id', authenticateToken, async function(req, res, next) {
  res.send(await taskService.getTaskById(req.params.id));
});

router.delete('/delete', authenticateToken, async function(req, res, next) {
  res.send(await taskService.deleteTaskById(req.body));
});

router.put('/update', authenticateToken, async function(req, res, next) {
  res.send(await taskService.updateTaskById(req.body.taskId, req.body.updateData));
});

export default router;
