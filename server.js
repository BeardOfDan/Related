const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// ================
// === GET PATH ===
// ================

// This path handles requests from the Entry Point service
app.get('/related:videoID', (req, res, next) => {
  // Entry Server is looking for related videos to send to client

  const videoID = req.params.videoID.slice(1);

  console.log('videoID', videoID);

  // do lookup for related videos for that content

  // Output:
  // [{ videoID, title, views, thumbnail }]

  res.end(videoID);
});


// ==================
// === POST PATHS ===
// ==================

// This path handles requests from the Videos service
app.post('/update', (req, res, next) => {
  // get the video from the request body
  const video = req.body;

  // ensure that only the desired fields are accepted
  const desiredFields = ['update', '_id', 'title', 'description', 'tags', 'channelId', 'categoryId', 'topicCategories', 'thumbnailURL', 'publishedAt', 'duration'];
  let desiredFieldsCount = 0;
  const keys = Object.keys(video);
  for (let i = 0; i < keys.length; i++) {
    if (desiredFields.indexOf(keys[i]) === -1) {
      delete video[keys[i]];
    } else {
      desiredFieldsCount++;
    }
  }

  // Check for an error with the number of fields received
  // NOTE: it is possible that there may simply be fewer than normal fields, without an error, follow up on this later with Dustin
  if (desiredFields !== desiredFields.length) {
    console.log(`Probable error in the POST path /update\nExpected ${desiredFields.length} fields, but recieved ${desiredFieldsCount} fields instead!`);
  }

  // update my database with this new video (as a node)
  // then send a response to signify receipt of the video
  console.log('add video...');
  res.end(JSON.stringify(video, undefined, 2));

  // then add edges to the new video
  console.log('add edges...');
});

// This path handles requests from the History service
app.post('/userData', (req, res, next) => {
  const { data } = req.body;

  // update the edges between the relevent nodes with the order of the data as a sequence

  // The response is the number of videos received
  // This may prove useful for debugging at some point
  res.end(`${data.length}`);
});


// path to update video view count



app.listen(PORT, () => {
  console.log('listening on port:', PORT);
});
