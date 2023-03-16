const express = require('express');
const { IgApiClient } = require('instagram-private-api');

const app = express();
const port = 3000;

// Instagram API credentials
const ig = new IgApiClient();
ig.state.generateDevice('YOUR_USERNAME');

// API endpoint to get all likers and commenters for a given post URL
app.get('/post/:postId', async (req, res) => {
  const postUrl = req.params.postId;
  
  try {
    // Use the Instagram API to get the post ID from the URL
    const { media } = await ig.media.infoByUrl(postUrl);
    const mediaId = media.id;

    // Use the Instagram API to get the list of all likers and commenters for the post
    const likers = await ig.media.likers(mediaId);
    const commenters = await ig.media.comments(mediaId);

    // Extract relevant data from the likers and commenters objects
    const likerUsernames = likers.map(liker => liker.username);
    const commenterUsernames = commenters.map(comment => comment.user.username);

    // Return the likers and commenters as a JSON response
    res.send({ likers: likerUsernames, commenters: commenterUsernames });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching likers and commenters');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
