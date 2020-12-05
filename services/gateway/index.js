const express = require('express');
const clients = require('clients');
const app = express();

app.get('/', async (req, res) => {
  // try {
  //   const user = await clients.users.get({ id: '1' });
  //   const playlists = await clients.playlists.userPlaylists({ userId: '1' });
  //   res.json({
  //     ...user,
  //     playlists,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.send(err);
  // }

  const x = clients.users.get({ id: '1' }, (usErr, us) => {
    if (usErr) {
      console.error('Users error', usErr);
      res.send(usErr);
      return;
    }

    clients.playlists.userPlaylists({ userId: '1' }, (plErr, pl) => {
      if (plErr) {
        console.error('PL error', plErr);
        res.send(plErr);
        return;
      }

      res.json({
        ...us,
        playlists: pl,
      });
    });
  });

  console.log(x);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});
