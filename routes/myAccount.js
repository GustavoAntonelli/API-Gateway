import express from 'express';
import userService from '../services/userService.js';
import authenticateToken from '../services/authentication.js'
var router = express.Router();

router.get('/email/:email', authenticateToken, async function(req, res, next) {
  res.send(await userService.getUserByEmail(req.params.email));
});

router.get('/:id', authenticateToken, async function(req, res, next) {
  res.send(await userService.getUserById(req.params.id));
});

router.delete('/delete', authenticateToken, async function(req, res, next) {
  res.send(await userService.deleteUserById(req.body));
});

router.put('/update/email', authenticateToken, async function(req, res, next) {
  res.send(await userService.updateUserByEmail(req.body.userEmail, req.body.updateData));
});

router.put('/update/id', authenticateToken, async function(req, res, next) {
  res.send(await userService.updateUserById(req.body.userId, req.body.updateData));
});

export default router;
