const players = require('../data/playerList');

module.exports = {
  getPlayers: (req, res) => {
    const { position } = req.query;
    if (position) {
      console.log(position);
      const filterdPlayers = players[position];
      return res.status(200).json(filterdPlayers);
    }
    res.json([
      ...players.forwards,
      ...players.midfielders,
      ...players.defenders,
      ...players.goalkeepers,
    ]);
  },
};
