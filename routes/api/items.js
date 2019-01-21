const express = require('express');
const router = express.Router();
const connection = require('../../dbconnect');
const mysql = require('mysql');
//SELECT id_post, slug_post, title, published, date, modified, type, content, excerpt, scheduled_date, categories, tags, author, thumbnail_image, featured_image, GROUP_CONCAT(name_category SEPARATOR ',') AS name_categories, GROUP_CONCAT(id_category SEPARATOR ',') as id_categories, GROUP_CONCAT(slug_category SEPARATOR ',') as slug_categories FROM posts INNER JOIN categories ON FIND_IN_SET(categories.id_category, posts.categories) != 0 GROUP BY id_post
router.get('/', (req, res) => {
  connection.query(
    "Select id_post, slug_post, title, published, date, modified, type, content, excerpt, scheduled_date, author, thumbnail_image, featured_image , group_concat(DISTINCT posts_has_categories.category_id SEPARATOR ',') as 'categories', group_concat(DISTINCT posts_has_tags.tag_id SEPARATOR ',') as 'tags', group_concat(DISTINCT categories.name_category  SEPARATOR ',') as 'name_categories', group_concat(DISTINCT categories.slug_category SEPARATOR ',') as 'slug_categories' from posts INNER JOIN posts_has_categories ON posts.id_post = posts_has_categories.post_id LEFT JOIN posts_has_tags ON posts.id_post = posts_has_tags.post_id INNER JOIN categories ON posts_has_categories.category_id = categories.id_category group by posts.id_post",
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

router.put('/:id', (req, res) => {
  var id = req.params.id;
  var post = {
    status: req.body.status,
    slug_post: req.body.slug,
    title: req.body.title,
    published: req.body.published,
    date: req.body.date,
    type: req.body.type,
    content: req.body.content,
    excerpt: req.body.excerpt,
    scheduled_date: req.body.scheduled_date,
    author: req.body.author,
    thumbnail_image: req.body.thumbnail_image,
    featured_image: req.body.featured_image
  };

  connection.query('UPDATE posts SET ? WHERE id_post = ?', [post, id], function(error, results, fields) {
    if (error) throw error;

    connection.query('DELETE FROM posts_has_categories WHERE post_id =' + mysql.escape(id), function(error, results, fields) {
      if (error) throw error;

      for (var i = 0, count = req.body.categories.length; i < count; i++) {
        var category = {
          post_id: id,
          category_id: req.body.categories[i]
        };
        connection.query('INSERT INTO posts_has_categories SET ?', category, function(error, results, fields) {
          if (error) throw error;
        });
      }
    });
    connection.query('DELETE FROM posts_has_tags WHERE post_id =' + mysql.escape(id), function(error, results, fields) {
      if (error) throw error;

      for (var i = 0, count = req.body.tags.length; i < count; i++) {
        var tags = {
          post_id: id,
          tag_id: req.body.tags[i]
        };
        connection.query('INSERT INTO posts_has_tags SET ?', tags, function(error, results, fields) {
          if (error) throw error;
        });
      }
    });
    res.send(results);
  });
});

router.post('/', (req, res) => {
  var post = {
    id_post: null,
    status: req.body.status,
    slug_post: req.body.slug,
    title: req.body.title,
    published: req.body.published,
    date: req.body.date,
    type: req.body.type,
    content: req.body.content,
    excerpt: req.body.excerpt,
    scheduled_date: req.body.scheduled_date,
    author: req.body.author,
    thumbnail_image: req.body.thumbnail_image,
    featured_image: req.body.featured_image
  };

  connection.query('INSERT INTO posts SET ?', post, function(error, results, fields) {
    if (error) throw error;

    connection.query('SELECT LAST_INSERT_ID() AS last_id from posts', function(error, results, fields) {
      if (error) throw error;

      for (var i = 0, count = req.body.categories.length; i < count; i++) {
        var category = {
          post_id: results[0].last_id,
          category_id: req.body.categories[i]
        };
        connection.query('INSERT INTO posts_has_categories SET ?', category, function(error, results, fields) {
          if (error) throw error;
        });
      }
      for (var i = 0, count = req.body.tags.length; i < count; i++) {
        var tags = {
          post_id: results[0].last_id,
          tag_id: req.body.tags[i]
        };
        connection.query('INSERT INTO posts_has_tags SET ?', tags, function(error, results, fields) {
          if (error) throw error;
        });
      }
    });
    res.send(results);
  });
});


router.get('/:id', (req, res) => {
  var id = req.params.id;

  connection.query('SELECT * FROM posts where id_post = ?', id, function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.delete('/:id', (req, res) => {
  var id = req.params.id;
  connection.query('DELETE FROM posts WHERE id_post =' + mysql.escape(id), function(error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
