const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movielist, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Movielist.findAll({
       where: {
          user_id: req.session.user_id
       },
       attributes: [
        "id",
        "user",  
        "release_date",
        "title",
        "media_type",
        "episodes",
        "current_episode",
        "series_is_ongoing",
        "gaming_system",
        "author",
        "duration_in_minutes",
        "watch_soon",
        "completed",
        "completion_date",
        "user_rating",
        "imdb_rating",
        "notes",
        "imdb_link",
        "watch_link",
       ]
    })
       .then(movieData => {
          const movies = movieData.map(movie => movie.get({ plain: true }));
          res.render('dashboard', { movies, loggedIn: true });
       })
       .catch(err => {
          console.log(err);
          res.status(500).json(err);
       });
 });
 
//  router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findOne({
//        where: {
//           user_id: req.session.user_id
//        },
//        attributes: [
//           'id',
//           'title',
//           'created_at'
//        ],
//        include: [
//           {
//              model: Comment,
//              attributes: [
//                 'id',
//                 'comment_text',
//                 'post_id',
//                 'user_id',
//                 'created_at'
//              ],
//              include: {
//                 model: User,
//                 attributes: ['username']
//              }
//           },
//           {
//              model: User,
//              attributes: ['username']
//           }
//        ]
//     })
//        .then(postData => {
//           const post = postData.get({ plain: true });
//           res.render('edit-post', { post, loggedIn: true });
//        })
//        .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//        });
//  });




module.exports = router;