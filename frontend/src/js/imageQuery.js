class ImageQuery {
    constructor(mode){
        this.mode = mode;
        this.imageContainer = $("div[id='images']");
        this.beachImageCount = [];
        this.centralParkImageCount = [];
        this.timesSquareImageCount = [];
    }

    change_mode(new_mode){
        this.mode = new_mode;
    }

    query_images(query){
        console.log(query);
        this.delete_images();
        console.log("performing query...");
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
            // return ;
            let count = 10,
                url = 'https://storage.googleapis.com/mitribu-mobile/social/memes/',
                rowNum = 0,
                rowName = null;
            for (var i=8; i<(8+count); i++){
                let full_url = `${url}${i}.png`,
                    imageElement = `<img src=${full_url} >`,
                    modulo = i % 4;
    
                if (modulo == 0){
                    rowName = `row-${rowNum}`;
                    let rowElement = `<div class='imageRow' name=${rowName}></div>`
                    this.imageContainer.append(rowElement)
                    rowNum += 1
                }
                this.imageContainer > $(`div[name='${rowName}']`).append(imageElement)
            }
            this.add_image_counts(count);
            console.log("added images...")
        }
    }