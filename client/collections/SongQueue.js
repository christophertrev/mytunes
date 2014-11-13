// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){
    this.on('add',function(){
      if(this.length === 1){
        //debugger;
        this.playFirst();
      }
    },this);

    this.on('ended',function(){
      this.removeSong();
      if(this.length>0){
        this.playFirst();
      }
    });

    this.on('dequeue',function(){
      this.removeSong();
    });

  },


  playFirst: function(){
    this.at(0).play();
  },

  removeSong: function(){
    this.remove(this.at(0));
  }

});

