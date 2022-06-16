import express from 'express';
import cors from 'cors';

const MINUS_TEN = -10;

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    username: 'bobesponja',
    avatar:
      'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info',
  },
];

const tweets = [
  {
    username: 'bobesponja',
    tweet: 'eu amo o hub',
  },
];

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  users.push({ username, avatar });

  res.send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  tweets.push({ username, tweet });

  res.send('OK');
});

app.get('/tweets', (req, res) => {
  const lastTenTweets = tweets.slice(MINUS_TEN);

  const tweetsWithUserAvatars = lastTenTweets.map((tweet) => {
    const currentUser = users.find((user) => user.username === tweet.username);

    return { ...tweet, avatar: currentUser.avatar };
  });

  res.send(tweetsWithUserAvatars);
});

export default app;
