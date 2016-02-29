'use strict';
var mongoose = require( "mongoose" );

var schema = new mongoose.Schema({
  // Title
  // the title of the blog, shown at the top of every page
  title: {
    type: String
  },
  // Description
  // a small blurb about the blog's purpose, shown on the sidebar
  description: {
    type: String
  },
  // ImageURL
  // url to an image to use as the blog's main icon
  imageURL: {
    type: String
  },
  // Slug
  // a simplified version of the blog's title used as a reference to its source files
  slug: {
    type: String,
    required: true
  },
  // Published Posts
  // an array of posts that have been published to this blog
  publishedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Post"
  }
});

schema.methods.getPosts = function( page, pageSize ) {
  var offset = page * pageSize;

  return mongoose.model( "Post" ).find({ _id: { $in: { this.publishedPosts }}})
    .offset( offset ).limit( pageSize ).exec();
}

module.exports = mongoose.model( "Blog", schema );
