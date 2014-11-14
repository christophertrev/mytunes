// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    //this.songQueueView = new SongQueueView({collection: this.model.get('currentSongQueue')});
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'

    this.model.on('change:currentSong', function(model){
      this.playerView.setSong(this.model.get('currentSong'));
    }, this);

    this.renderedViews = [  this.playerView.$el,
      $('<form>').html('<input type="text" name="playlist" id="playlist"/><input type="submit" name="submit" class="submit"/> '),
      this.libraryView.$el,
     // this.songQueueView.$el
      ];
  },

  events: {
    'submit form': 'handleSubmit'
  },

  render: function(){
    this.$el.children().detach();
    return this.$el.html(this.renderedViews);
  },

  handleSubmit: function(e){
    e.preventDefault();
    //make new queue with name of playlist
    var $name = this.$('#playlist');
    var name = $name.val();
    $name.val('');

    this.model.addQueueToModel(name);
    var songview = new SongQueueView({collection: this.model.get(name),'name':name});
    this.renderedViews.push(songview.$el);
    this.render();
  },


});
