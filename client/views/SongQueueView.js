// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function(params) {
    if(params.name){
      this.addName(params.name)
    }
    this.render();
    this.collection.on('add', this.render, this );
    this.collection.on('remove',this.render,this);
    this.$('th').on('click',function(){
      this.makeCurrentPlayList();
    }.bind(this));
  },

  title: 'Current Playlist',

  render: function() {
    this.$el.children().detach();
    this.$el.html('<th>'+ this.title +'</th>').append(
      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
    return this.$el;
  },

  addName: function(name){
    this.title = name;
  },

  makeCurrentPlayList: function(){
    // this.trigger('clicked',this);
    debugger;
    this.collection.makeCurrentQueue();
  }

});
