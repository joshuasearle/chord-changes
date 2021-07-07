const express = require('express');

const router = express.Router();

const { authenticateToken } = require('./auth/tokens');

const { createUser, loginUser } = require('./controllers/userControllers');
const {
  getChords,
  addChord,
  removeChord,
} = require('./controllers/chordControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);

router.use(authenticateToken);

router.get('/chords', getChords);
router.post('/chords', addChord);
router.delete('/chords', removeChord);

module.exports = router;
