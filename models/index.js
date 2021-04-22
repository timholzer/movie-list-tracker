const Movielist = require("./movie_list");
const User = require("./user");



User.hasMany(Movielist, {
    foreignKey: 'user_id'
 });

module.exports = { Movielist,
User }; 