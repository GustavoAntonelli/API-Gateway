import express from 'express';
import userService from '../services/userService.js';

var router = express.Router();

router.post('/', async function(req, res, next) {
  res.send(await userService.loginUser(req.body));
});

export default router;
