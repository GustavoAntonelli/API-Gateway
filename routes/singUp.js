import express from 'express';
import userService from '../services/userService.js';

var router = express.Router();

router.post('/register', async function(req, res, next) {
  res.send(await userService.registerUser(req.body));
});

export default router;
