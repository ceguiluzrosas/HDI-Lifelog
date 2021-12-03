class ModeToggler {
    constructor(mode){
        this.mode = mode;
        this.label1 = [];
        this.temporalRelation = [];
        this.spatialRelation = [];
        this.label2 = [];
        this.recentQuery = {};
        this.time = new Date().getTime();
    }

    log_time(){
        let diff = (new Date().getTime() - this.time) / 1000;
        switch (this.mode) {
            case "ro":
                this.roTime.push(diff);
                break;
            case "os":
                this.osTime.push(diff);
                break;
            case "po":
                this.poTime.push(diff);
                break;
            default:
                break;
        }
        this.time = new Date().getTime();
    }

    clear_inputs(){
        let x = $(`div[id='query-container'] > input[type='text']`).children();
        for (var i=0; i < x.prevObject.length; i++){
            x.prevObject[i].value = "";
        }
    }

    save_data(){
        let x = $(`div[id='query-container'] > input[type='text']`).children(),
            query = {};
        for (var i=0; i < x.prevObject.length; i++){
            let input_name = x.prevObject[i].name,
                input_value = x.prevObject[i].value;
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