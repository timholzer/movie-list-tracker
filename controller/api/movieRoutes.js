const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movielist, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users movie lists, might skip a get all to get all with user
// router.get('/', (req, res) => {
//   Movielist.findAll({
//     attributes: [
//       'id', 
//       'content', 
//       'title', 
//       'created_at',
//     ],
//     order: [['created_at', 'DESC']],
//     include: [
//       {
//         model: Comment,
//         attributes: [
//           'id',
//           'comment_text',
//           'post_id',
//           'user_id',
//           'created_at'
//         ],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(postData => res.json(postData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
//  });

// get one movie
router.get('/:id', (req, res) => {
  Movielist.findOne({
    where: {
      id: req.params.id
      //might need to filter user and not include the include:
    },
    attributes: [
        'id', 'user', 'release_date', 'title', 'media_type', 'episodes', 'current_episode', 'series_is_ongoing', 'gaming_system', 'author', 'duration_in_minutes', 'watch_soon', 'completed', 'completion_date', 'user_rating', 'imdb_rating', 'notes', 'imdb_link', 'watch_link'
    ],
    include: [
      {
        model: User,
        attributes: ['user']
      }
    ]
  })
    .then(postData => {
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

 // create a movie to add
 router.post('/', withAuth, (req, res) => {
  Movielist.create({
    user: req.session.user_id,
    release_date: req.body.release_date,
    title: req.body.title,
    media_type: req.body.media_type,
    episodes: req.body.episodes,
    current_episode: req.body.current_episode,
    series_is_ongoing: req.body.series_is_ongoing,
    gaming_system: req.body.gaming_system,
    author: req.body.author,
    duration_in_minutes: req.body.duration_in_minutes,
    watch_soon: req.body.watch_soon,
    completed: req.body.completed,
    completion_date: req.body.completion_date,
    user_rating: req.body.user_rating,
    imdb_rating: req.body.imdb_rating,
    notes: req.body.notes,
    imdb_link: req.body.imdb_link,
    watch_link: req.body.watch_link
  })
    .then(movieData => res.json(movieData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post
router.put('/:id', withAuth, (req, res) => {
  Movielist.update(
    {
        user: req.session.user_id,
        release_date: req.body.release_date,
        title: req.body.title,
        media_type: req.body.media_type,
        episodes: req.body.episodes,
        current_episode: req.body.current_episode,
        series_is_ongoing: req.body.series_is_ongoing,
        gaming_system: req.body.gaming_system,
        author: req.body.author,
        duration_in_minutes: req.body.duration_in_minutes,
        watch_soon: req.body.watch_soon,
        completed: req.body.completed,
        completion_date: req.body.completion_date,
        user_rating: req.body.user_rating,
        imdb_rating: req.body.imdb_rating,
        notes: req.body.notes,
        imdb_link: req.body.imdb_link,
        watch_link: req.body.watch_link
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(movieData => {
      if (!movieData) {
        res.status(404).json({ message: 'No movie found with this id' });
        return;
      }
      res.json(movieData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {

  Movielist.destroy(
    {
      where: {
        id: req.params.id
      }
  })
    .then(movieData => {
      if(!movieData) {
        res.status(404).json({ message: 'No movie found with this id' });
        return;
      }
      res.json(movieData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
  
module.exports = router;