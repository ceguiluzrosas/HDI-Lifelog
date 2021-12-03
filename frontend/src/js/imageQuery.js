class ImageQuery {
    constructor(mode){
        this.mode = mode;
        this.imageContainer = $("div[id='images']");
        this.beachImageCount = [];
        this.centralParkImageCount = [];
        this.timesSquareImageCount = [];
        this.query = null;
    }

    change_mode(new_mode){
        this.mode = new_mode;
    }

    query_images(query){
        this.delete_images();
        console.log("performing query...");
        this.query = query;
        this.add_images();
    }

    add_image_counts(count){
        switch (this.mode) {
            case "beach":
                this.beachImageCount.push(count);
                break;
            case "times_square":
                this.timesSquareImageCount.push(count);
                break;
            case "central_park":
                this.centralParkImageCount.push(count);
                break;
            default:
                break;
        }
    }

    delete_images(){
        this.imageContainer > $('img').remove()
        console.log("deleted images...")
    }

    populate_menus(labels){
        for(let i=0; i<labels.length; i++){
            let labelName = labels[i],
                ele = `<a name='${labelName}'>${labelName}</a>`;
            $(`#label1Dropdown`).append(ele);    
            $(`#label2Dropdown`).append(ele);        
        }
    }

    add_options(){
        let times_square = ['cup', 'bench', 'umbrella', 'kite', 'banana', 'suitcase', 'car', 'diningtable', 'laptop', 'bus', 'teddy bear', 'toothbrush', 'horse', 'pottedplant', 'traffic light', 'backpack', 'person', 'handbag', 'cell phone', 'tvmonitor', 'bicycle', 'chair', 'bottle', 'truck', 'tie', 'motorbike'],
            beach = ['frisbee', 'bottle', 'horse', 'backpack', 'suitcase', 'person', 'umbrella', 'chair', 'kite', 'handbag', 'boat', 'cup', 'bench', 'car', 'surfboard'],
            central_park = ['person', 'motorbike', 'elephant', 'backpack', 'skateboard', 'handbag', 'stop sign', 'bench', 'cow', 'zebra', 'remote', 'cell phone', 'bicycle'];
        switch (this.mode) {
            case "beach":
                this.populate_menus(beach);
                break;
            case "times_square":
                this.populate_menus(times_square);
                break;
            case "central_park":
                this.populate_menus(central_park);
                break;
            default:
                break;
            }
        }

    add_images(){
        let githubURL = "https://raw.githubusercontent.com/ceguiluzrosas/HDI-Lifelog/main/data/",
            query = this.query,
            intersect = new Set([]),
            imageContainer = this.imageContainer,
            mode = this.mode;
        $.getJSON(`${githubURL}/map_${this.mode}.json`, function(data){
            let a = new Set(data[query['label1']]),
                b = new Set(data[query['label2']]);
            if (query['label2'] == ''){
                intersect = a;
            } else {
                intersect = new Set([...a].filter(i => b.has(i)));
            }
            
            let intersect_array = Array.from(intersect);
            console.log(intersect_array);
            for (var i=0; i<intersect_array.length; i++){
                console.log(intersect_array[i]);
            }
            let url = `https://storage.googleapis.com/hdi-final-project/frames/${mode}/`,
            rowNum = 0,
            rowName = null;
            for (var i=0; i<intersect_array.length; i++){
                let full_url = `${url}${intersect_array[i]}`,
                    imageElement = `<img src=${full_url} >`,
                    modulo = i % 4;

                if (modulo == 0){
                    rowName = `row-${rowNum}`;
                    let rowElement = `<div class='imageRow' name=${rowName}></div>`
                    imageContainer.append(rowElement)
                    rowNum += 1
                }
                imageContainer > $(`div[name='${rowName}']`).append(imageElement)
            }
            // this.add_image_counts(intersect_array.length);
            console.log("added images...")
        });
    }
}