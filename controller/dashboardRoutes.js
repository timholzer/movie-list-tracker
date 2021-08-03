const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movielist, User } = require('../models');
const withAuth = require('../utils/auth');



//might not need to be returned

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
        "watch_link"
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
 
//id might not need to be returned

 router.get('/edit/:id', withAuth, (req, res) => {
    Movielist.findOne({
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
        "watch_link"
       ]    
    })
       .then(movieData => {
          const post = movieData.get({ plain: true });
          res.render('edit-item', { post, loggedIn: true });
       })
       .catch(err => {
          console.log(err);
          res.status(500).json(err);
       });
 });

 //figure out where to have allowence of nulls being accepted, but not a completely blank entry

 router.post('/', withAuth, (req, res) => {
    Movielist.create({

      //id might be automatically added
      //id: req.session.user_id,
      user: req.session.user_id,  
      release_date: req.body.releasedate,
      title: req.body.title,
      media_type: req.body.mediatype,
      episodes: req.body.episodes,
      current_episode: req.body.currentepisode,
      series_is_ongoing: req.body.seriesisongoing,
      gaming_system: req.body.gamingsystem,
      author: req.body.author,
      duration_in_minutes: req.body.duration,
      watch_soon: req.body.watchsoon,
      completed: req.body.complete,
      completion_date: req.body.completiondate,
      user_rating: req.body.userrating,
      imdb_rating: req.body.imdbrating,
      notes: req.body.notes,
      imdb_link: req.body.imdblink,
      watch_link: req.body.watchlink
    })
      .then(movieData => res.json(movieData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });




module.exports = router;