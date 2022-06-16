import express from 'express';
import cors from 'cors';

const MINUS_TEN = -10;
const CREATED_STATUS_CODE = 201;
const BAD_REQUEST_STATUS_CODE = 400;

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

function getTweetWithUserAvatar(tweet) {
  const currentUser = users.find((user) => user.username === tweet.username);

  return { ...tweet, avatar: currentUser.avatar };
}

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res
      .status(BAD_REQUEST_STATUS_CODE)
      .send('Todos os campos são obrigatórios!');

    return;
  }

  users.push({ username, avatar });

  res.status(CREATED_STATUS_CODE).send('OK');
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res
      .status(BAD_REQUEST_STATUS_CODE)
      .send('Todos os campos são obrigatórios!');

    return;
  }

  tweets.push({ username, tweet });

  res.status(CREATED_STATUS_CODE).send('OK');
});

app.get('/tweets', (req, res) => {
  const lastTenTweets = tweets.slice(MINUS_TEN);

  const tweetsWithUserAvatars = lastTenTweets.map(getTweetWithUserAvatar);

  res.send(tweetsWithUserAvatars);
});

app.get('/tweets/:username', (req, res) => {
  const { username } = req.params;

  const userTweets = tweets
    .filter((tweet) => tweet.username === username)
    .map(getTweetWithUserAvatar);

  res.send(userTweets);
});

export default app;
