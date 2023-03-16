const express = require('express');
const Twit = require('twit');

const app = express();
const port = 3000;

// Twitter API credentials
const T = new Twit({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  access_token: 'YOUR_ACCESS_TOKEN',
  access_token_secret: 'YOUR_ACCESS_TOKEN_SECRET'
});

// API endpoint to get all followers for a given username
app.get('/followers/:username', (req, res) => {
  const username = req.params.username;
  
  // Use the Twitter API to get the user ID for the given username
  T.get('users/show', { screen_name: username }, function(err, data, response) {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching user ID');
    } else {
      const userId = data.id_str;
      
      // Use the Twitter API to get the list of all followers for the user
      T.get('followers/ids', { user_id: userId }, function(err, data, response) {
        if (err) {
          console.log(err);
          res.status(500).send('Error fetching followers');
        } else {
          const followerIds = data.ids;
          
          // Use the Twitter API to get the user objects for each follower
          T.get('users/lookup', { user_id: followerIds }, function(err, data, response) {
            if (err) {
              console.log(err);
              res.status(500).send('Error fetching follower data');
            } else {
              // Extract relevant data from the follower objects
              const followers = data.map(user => ({
                id: user.id_str,
                name: user.name,
                screenName: user.screen_name,
                location: user.location,
                description: user.description
              }));
              
              // Return the followers as a JSON response
              res.send({ followers });
            }
          });
        }
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
