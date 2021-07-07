const getChords = async (req, res) => {
  const user = req.user;
  res.status(200).json(user.chords);
};

const addChord = async (req, res) => {
  const chord = req.body.chord;
  const user = req.user;
  if (user.chords.includes(chord)) {
    return res.status(400).json({ message: 'Chord is already in chord list' });
  }
  user.chords.push(chord);
  await user.save();
  res.status(201).json(user.chords);
};

const removeChord = async (req, res) => {
  const chord = req.body.chord;
  const user = req.user;
  if (!user.chords.includes(chord)) {
    return res.status(400).json({ message: 'Chord is not in chord list' });
  }
  user.chords = user.chords.filter((userChord) => userChord !== chord);
  await user.save();
  res.status(200).json(user.chords);
};

module.exports = { getChords, addChord, removeChord };
