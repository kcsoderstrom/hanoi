var Game = function() {
  this.$carrying = null;
};

Game.prototype.isLegal = function($el) {
  if($el.hasClass("populated")) {
    // this shouldn't even happen
    return false;
  }

  var size = this.underBottomSize($el);
  return ( size > this.$carrying.attr("class")[14] );
};

Game.prototype.start = function() {
  var that = this;

  $("ul ul li").on("mousedown", function(event){
    var $li = $(event.currentTarget);
    var $top = that.topLi($li);

    if($top && $top.hasClass("selected")) {
      $top.removeClass("selected");
      that.$carrying = null;
    } else if(that.$carrying) {
      var bottomLi = that.bottomLi($li);
      if(that.isLegal(bottomLi)) {
        that.$carrying.removeClass("selected");
        bottomLi.addClass(that.$carrying.attr("class"));
        that.$carrying.removeClass();
        that.$carrying = null;
      }
    } else if($top && $top.hasClass("populated")) {
      that.$carrying = $top;
      $top.addClass("selected");
    }
  });

};

Game.prototype.topLi = function ($li) {
  var col = $li.attr("id")[0];
  var rockBottom = $("li#" + col + "0");
  var middle = $("li#" + col + "1");
  var top = $("li#" + col + "2");
  if(top.hasClass("populated")) {
    return top;
  }

  if(middle.hasClass("populated")) {
    return middle;
  }

  if(rockBottom.hasClass("populated")) {
    return rockBottom;
  }

  return null;
};

Game.prototype.bottomLi = function ($li) {
  var col = $li.attr("id")[0];
  var rockBottom = $("li#" + col + "0");
  var middle = $("li#" + col + "1");
  var top = $("li#" + col + "2");
  if(!rockBottom.hasClass("populated")) {
    return rockBottom;
  }

  if(!middle.hasClass("populated")) {
    return middle;
  }

  return top;
};

Game.prototype.underBottomSize = function ($li) {
  var bottomLi = this.bottomLi($li);
  var col = bottomLi.attr("id")[0];
  var row = bottomLi.attr("id")[1];

  if(row == 0) {
    return 3;
  }

  var lowerLi = $("#" + col + (row - 1));
  return lowerLi.attr("class")[14];
};
