const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/related:videoID', (req, res, next) => {
  // Entry Server is looking for related videos to send to client

  const videoID = req.params.videoID.slice(1);

  console.log('videoID', videoID);

  // do lookup for related videos for that content

  // Output:
  // [{ videoID, title, views, thumbnail }]

  res.end(videoID);
});




app.listen(PORT, () => {
  console.log('listening on port:', PORT);
});
