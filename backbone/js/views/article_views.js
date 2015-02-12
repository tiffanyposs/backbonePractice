$(document).ready(function() {
  var ArticlesView = Backbone.View.extend({
    el: '#articlesList',
    initialize: function() {
      this.listenTo(this.collection, 'sync remove', this.render);
    },
 
    render: function() {
      var el = this.$el;
      el.html('');
      this.collection.each(function(article) {
        el.append(new ArticleView({model: article}).render().el);
      });
      return this;
    }
  });

  var ArticleView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($("#articleTemplate").html()),
    events: {
              'click .deleteButton': 'deleteArticle',
              'click .editButton': 'editArticle',
              'click .updateButton': 'updateArticle'
            },
    editArticle: function() {
      this.$('.article').hide();
      this.$('.editForm').show();
    },

    updateArticle: function() {
      var newHeadline = this.$('#newHeadline' + this.model.id).val();
      var newContent = this.$('#newContent' + this.model.id).val();
      var newAuthor = this.$('#newAuthor' + this.model.id).val();
      this.model.set({headline: newHeadline, content: newContent, author: newAuthor});
      this.model.save();
    },
    
    deleteArticle: function() {
      this.model.destroy();
    },

    render: function() {
      this.$el.html(this.template({article: this.model.toJSON()}));
      return this;
    }
  });

  var CreateArticleView = Backbone.View.extend({
    el: "#addArticleForm",
    events: {'click #addNewArticle': 'createArticle' },
    createArticle: function() {
      var headlineField = this.$('#newArticleHeadline');
      var contentField = this.$('#newArticleContent');
      var authorField = this.$('#newArticleAuthor');
      var newArticleHeadline = headlineField.val();
      var newArticleContent = contentField.val();
      var newArticleAuthor = authorField.val();

      this.collection.create({headline: newArticleHeadline, content: newArticleContent, author: newArticleAuthor});

      headlineField.val('');
      contentField.val('');
      authorField.val('');
    }
  });

  var createArticleView = new CreateArticleView({collection: articles});
  var articlesView = new ArticlesView({collection: articles});
});
