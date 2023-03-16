const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const getHTML = require("./lib/scraper");
const bodyparser = require("body-parser");
const CircularJSON = require("circular-json");

const PORT = process.env.API_PORT || 4000;
const app = express();

app.use(cors("*"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const html = getHTML.getHTML;

const url = "https://www.instagram.com/dipraise_/";

async function getFollowers(username) {
  try {
    const { data } = await axios.get(
      `https://www.instagram.com/${username}/?__a=1`
    );
    console.log(data);
    user = data.graphql.user;
    let followers = user.edge_followed_by.count;
    let following = user.edge_follow.count;
    let fullname = user.full_name;
    let user_name = user.username;
    let profile_pic = user.profile_pic_url_hd;
    let biography = user.biography;
    let recentPostMediaUrl =
      user.edge_owner_to_timeline_media.edges[0].node.display_url;
    let recentPostTotalLikes =
      user.edge_owner_to_timeline_media.edges[0].node.edge_liked_by.count;
    let recentPostTotalComments =
      user.edge_owner_to_timeline_media.edges[0].node.edge_media_to_comment
        .count;
    let recentPostType =
      user.edge_owner_to_timeline_media.edges[0].node.__typename;
    console.log(
      `${user_name} has ${followers} followers and follows ${following}. The account's full name is ${fullname} and their biography is ${biography}`
    );
    console.log(`Recent Post - Url - ${recentPostMediaUrl}`);
    console.log(
      `Recent Post - Total Number of Likes - ${recentPostTotalLikes}`
    );
    console.log(
      `Recent Post - Total Number of Comments - ${recentPostTotalComments}`
    );
    console.log(`Recent Post - Post Type - ${recentPostType}`);
  } catch (error) {
    console.log("USER NOT FOUND");
    console.log(error);
    //throw Error(error);
  }
}

app.get("/", async (req, res) => {
  //The input from the terminal can be found with response.username
  //now we take that result and call getFollowers
  const { data } = await axios.get(`https://www.instagram.com/kidd_grayson/`);

  const $ = cheerio.load(data);
  const mango = $("meta");
  console.log(mango);

  const str = CircularJSON.stringify(mango);
  const resp = JSON.parse(str);
  res.json(
    resp[0].parent.children[2].next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.next.next.next.next.next.next.next.next.next.next.next.next
      .next.next.attribs.content
  );
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
