// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new SongModel());
    //this.set('songQueue', new SongQueue());
    this.set('currentSongQueue', new SongQueue());
    /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */


    // params.library.on('play', function(song){
    //   debugger
    //   this.set('currentSong', song);
    // }, this);
    // this.get('currentSongQueue').on('play', function(song){
    //   debugger
    //   this.set('currentSong', song);
    // }, this);





    // this.on('change',function(){
    //   debugger
    //   var changed = this.changedAttributes();
    //   changed.on('click', function(){debugger});
    // });

    params.library.on('enqueue', function(song){
      // debugger;
      var clone_song = song.clone();
      this.get('currentSongQueue').add(clone_song);
    }, this);
  },


    // this.on('change',function(){
    //   debugger
    //   var changed = this.changedAttributes();
    //   changed.on('click', function(){debugger});
    // });

  addQueueToModel: function(name){
    this.set(name, new SongQueue());
    this.get(name).on('makeCurrentQueue',function(queue){
      // debugger;
      this.set('currentSongQueue',queue);
    }.bind(this));

    this.get(name).on('play',function(song){
      // debugger;
      this.set('currentSong', song);
    }.bind(this));
  }

});
