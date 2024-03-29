// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    //this.songQueueView = new SongQueueView({collection: this.model.get('currentSongQueue')});
    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'

    this.model.on('change:currentSong', function(model){
      debugger
      this.playerView.setSong(this.model.get('currentSong'));
    }, this);

    this.renderedViews = [  this.playerView.$el,
      $('<div>').html('<input type="text" name="playlist" id="playlist"/><button name="submit" class="submit">Add PlayList</button> '),
      this.libraryView.$el,
       $('<div>').addClass('playlists')
      ];
    this.playListViews = [];

  },

  events: {
    'click .submit': 'handleSubmit'
  },

  render: function(){
    debugger
    // this.$el.children().detach();
    if(this.$el.children().length===0){
      this.$el.html(this.renderedViews);
    }else{
      this.$('.playlists').append(this.playListViews);
    }
    return this.$el;
  },

  handleSubmit: function(e){
    debugger;
    e.preventDefault();
    //make new queue with name of playlist
    var $name = this.$('#playlist');
    var name = $name.val();
    $name.val('');

    this.model.addQueueToModel(name);
    var songview = new SongQueueView({collection: this.model.get(name),'name':name});
    this.playListViews.push(songview.$el);
    this.render();
  },


});
