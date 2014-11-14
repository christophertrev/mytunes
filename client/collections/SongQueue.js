// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    // this.on('add',function(){
    //   if(this.length === 1){
    //     debugger;
    //     this.playFirst();
    //   }
    // },this);
    //debugger;

    //this.set(name, params.name),

    this.on('ended',function(song){
      this.removeSong();
      song.incrementPlayCount();
      if(this.length>0){
        this.playFirst();
      }
    });

    this.on('dequeue',function(song){
      //debugger;
      if (song === this.at(0)){
        this.remove(song);
        this.playFirst();
      }
      this.remove(song);
    });

  },


  playFirst: function(){

    this.at(0).play();
  },

  removeSong: function(){
    this.remove(this.at(0));
  },
  makeCurrentQueue: function(){
    // debugger;
    this.trigger('makeCurrentQueue',this);

  }

});

