class ModeToggler {
    constructor(mode){
        this.mode = mode;
        this.label1 = [];
        this.temporalRelation = [];
        this.spatialRelation = [];
        this.label2 = [];
        this.recentQuery = {};
        this.queryTimes = []
        this.time = new Date().getTime();
    }

    log_time(){
        let diff = (new Date().getTime() - this.time) / 1000;
        this.queryTimes.push(diff);
        this.time = new Date().getTime();
    }

    clear_inputs(){
        let x = $('.searchInput').children();
        for (var i=0; i < x.prevObject.length; i++){
            x.prevObject[i].value = "";
        }
    }

    save_data(type){
        let x = $('.searchInput'),
            query = {"type": type};
        for (let i=0; i<x.length; i++){
            let input_name = x[i].id.split("Input")[0],
                input_value = x[i].value;
            // console.log(`input_name: ${input_name}, input_value: ${input_value}`);
            switch (input_name) {
                case "label1":
                    this.label1.push(input_value);
                    break;
                case "temporalRelation":
                    this.temporalRelation.push(input_value);
                    break;
                case "spatialRelation":
                    this.spatialRelation.push(input_value);
                    break;
                case "label2":
                    this.label2.push(input_value);
                    break;
                default:
                    break;
            }
            query[input_name] = input_value;
        }
        this.recentQuery = query;
    }

    change_mode(new_mode) {
        this.clear_inputs();
        this.disable_mode();
        this.mode = new_mode;
        this.enable_mode();
    }

    disable_mode(){
        $(`input[id='${this.mode}']`).prop("checked", false);
    }

    enable_mode(){
        $(`input[id='${this.mode}']`).prop("checked", true);
    }

}