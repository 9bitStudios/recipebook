class Events {
 
    constructor(){ 
        this.eventList = { }; 
    }
    
    on(name, callback) {

        if(!this.eventList[name]) {
            this.eventList[name] = [];
        }
        this.eventList[name].push({callback:callback});
    }
    off(name){
        if(this.eventList[name]) {
            delete this.eventList[name];
        }
    }   
    broadcast(name){
        for(var i in this.eventList){
            if(i === name) {
                var args = Array.prototype.slice.call(arguments);
                args.splice(0, 1);
                for(var j=0; j< this.eventList[name].length; j++) {
                    this.eventList[name][j].callback.apply(this, args);
                }
            }
        }        
    }    
    getEventList(){
        return this.eventList
    }
}

export default new Events();