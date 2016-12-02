
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
      // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals (Note: root is window)
    // root.returnExports = factory(root.myModule, root.myOtherModule);
    root.returnExports = factory(jQuery);
  }
}(this, function (jQuery) {


  function Dashboard(json){
    json = json || {};
    this.name = json.nombre?json.nombre:"";
    this.id = json.nombre?json.id:"";
    this.num = json.nombre?json.num:"";
    this.serializedArray = json.serializedArray?json.serializedArray:"";
    this.datajson = json.datajson?json.datajson:"";
    this.default = json.default?json.default:"";
  }

  Dashboard.prototype = {
    getName: function(){
      return this.name;
    },
    getId: function(){
      return this.id;
    },
    setName: function(name){
      this.name=name;
    },
    setId: function(id){
      this.id=id;
    },
    getSerializedArray: function(){
      return this.serializedArray;
    },
    getDataJson: function(){
      return this.datajson;
    },
    getDefault: function(){
      return this.default;
    },
    setSerializedArray: function(serializedArray){
      this.serializedArray = serializedArray;
    },
    setDataJson: function(datajson){
      this.datajson = datajson;
    },
    setDefault: function(argDefault){
      this.default = argDefault;
    }

  }

  return Dashboard;

}));
