const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000;

// YouTube API credentials
const auth = new google.auth.GoogleAuth({
  keyFile: 'YOUR_SERVICE_ACCOUNT_KEY_FILE.json',
  scopes: ['https://www.googleapis.com/auth/youtube.readonly']
});
const youtube = google.youtube({
  version: 'v3',
  auth
});

// API endpoint to get all subscribers for a given channel ID
app.get('/subscribers/:channelId', async (req, res) => {
  const channelId = req.params.channelId;
  
  try {
    // Use the YouTube API to get the list of all subscribers for the channel
    let nextPageToken = null;
    let subscribers = [];
    do {
      const { data } = await youtube.subscriptions.list({
        part: 'subscriberSnippet',
        channelId,
        maxResults: 50,
        pageToken: nextPageToken
      });
      subscribers = subscribers.concat(data.items);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);
    
    // Extract relevant data from the subscriber objects
    subscribers = subscribers.map(subscriber => ({
      id: subscriber.snippet.resourceId.channelId,
      name: subscriber.snippet.title
    }));
    
    // Return the subscribers as a JSON response
    res.send({ subscribers });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching subscribers');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
