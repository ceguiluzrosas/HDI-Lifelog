class ModeToggler {
    constructor(mode){
        this.mode = mode;
        this.ro = {"object1": [], "relation": [], "object2": []};
        this.os = {"subject": [], "predict": [], "object": []};
        this.po = {"placeAttr": [], "placeType": [], "labelsG": [], "objectsG": []};
        this.recentQuery = {};
        this.time = new Date().getTime();
        this.roTime = [];
        this.osTime = [];
        this.poTime = [];
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
        let x = $(`div[id='${this.mode}-container'] > input[type='text']`).children();
        for (var i=0; i < x.prevObject.length; i++){
            x.prevObject[i].value = "";
        }
    }

    save_data(){
        let x = $(`div[id='${this.mode}-container'] > input[type='text']`).children(),
            query = {};
        for (var i=0; i < x.prevObject.length; i++){
            let input_name = x.prevObject[i].name.split("-")[1],
                input_value = x.prevObject[i].value;
            query[input_name] = input_value;
            switch (this.mode) {
                case "ro":
                    this.ro[input_name].push(input_value);
                    break;
                case "os":
                    this.os[input_name].push(input_value);
                    break;
                case "po":
                    this.po[input_name].push(input_value);
                    break;
                default:
                    break;
            }
        }
        this.recentQuery = query;
    }

    change_mode(new_mode) {
        this.disable_mode();
        this.mode = new_mode;
        this.enable_mode();
    }

    disable_mode(){
        $(`div[id='${this.mode}-container']`).css("display", "none");
        $(`input[id='${this.mode}']`).prop("checked", false);
    }

    enable_mode(){
        $(`div[id='${this.mode}-container']`).css("display", "block");
        $(`input[id='${this.mode}']`).prop("checked", true);
    }

}