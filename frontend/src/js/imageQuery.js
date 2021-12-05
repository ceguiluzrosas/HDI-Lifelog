class ImageQuery {
    constructor(mode){
        this.mode = mode;
        this.imageContainer = $("div[id='images']");
        this.subImageContainer = $("div[id='subsetImages']");
        this.beachImageCount = [];
        this.centralParkImageCount = [];
        this.timesSquareImageCount = [];
        this.query = null;
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.unpopulate_menus();
        this.delete_images();
        this.add_options();
    }

    async query_images(query){
        this.delete_images();
        console.log("performing reg query...");
        this.query = query;
        let imageData = await this.get_image_data(),
            image_array = this.populate_image_container(imageData);
        console.log("fetched and added images");
        if (image_array.length == 0){
            this.no_results();
        } else {
            let tagData = await this.get_tag_data(image_array),
                tag_array = this.populate_tag_container(image_array, tagData);
            console.log("fetched and added tags");
        }
        
    }

    async query_sub_images(query, numArray){
        this.delete_selected_images();
        this.delete_images();
        console.log("performing sub query...");

        this.query = query;
        let imageData = await this.get_image_data(),
            image_array = this.populate_image_container(imageData, true, numArray);
        
        console.log("fetched and added sub images");
        console.log(`subimagearray: ${image_array}`)
        if (image_array.length == 0){
            this.no_results();
        } else {
            let tagData = await this.get_tag_data(image_array),
                tag_array = this.populate_tag_container(image_array, tagData, true);
            console.log("fetched and added tags");
        }
    }

    order_image_array(unordered_names){
        let numbers = [];
        for(let i=0; i<unordered_names.length; i++){
            let number = unordered_names[i].split(".")[0];
            numbers.push(number)
        }
        numbers = numbers.sort((a,b)=>a-b).map(a => a + '.jpg')
        return numbers;
    }

    order_image_array_with_subset(unordered_names, subsetArray){
        let numbers = [];
        for(let i=0; i<unordered_names.length; i++){
            let number = unordered_names[i].split(".")[0];
            numbers.push(number);
        }

        let subset = [];
        for(let i=0; i<numbers.length; i++){
            let number = numbers[i];
            for(let j=0; j<=subsetArray.length-1; j++){
                if (subsetArray.length == 1 && number <= subsetArray[0]){
                    subset.push(number);
                }
                else if (subsetArray[j] <= number && number <= subsetArray[j+1]){
                    subset.push(number);
                }
            }
        }
        subset = subset.sort((a,b)=>a-b).map(a => a + '.jpg')
        console.log(`numbers: ${numbers}, subsetArray: ${subsetArray}, subset: ${subset}`);
        return subset;
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
        this.imageContainer.children().remove()
        console.log("deleted images...")
    }

    delete_selected_images(){
        this.subImageContainer.children().remove()
        console.log("deleted sub images...");
    }

    unpopulate_menus(){
        $(`a[class='options']`).remove();
        $(`a[class='options']`).remove();
    }

    populate_menus(labels){
        for(let i=0; i<labels.length; i++){
            let labelName = labels[i],
                ele = `<a class='options' name='${labelName}'>${labelName}</a>`;
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

    get_tag_data(array){
        console.log(this.mode);
        console.log(`this is array: ${array}`);
        let githubURL = "https://raw.githubusercontent.com/ceguiluzrosas/HDI-Lifelog/main/data/";
        return new Promise((resolve, reject) => {
            $.getJSON(`${githubURL}/${this.mode}.json`, data => {
                let output = {};
                for(let i=0; i<array.length; i++){
                    let fileName = array[i],
                        tags_info = data[fileName],
                        tags = [];
                    for(let j=0; j<tags_info.length; j++){
                        let tag = tags_info[j]["item_name"];
                        tags.push(tag);
                    }
                    output[array[i]] = tags;
                }
                resolve(output);
            });
        })
    }

    get_image_data(){
        let githubURL = "https://raw.githubusercontent.com/ceguiluzrosas/HDI-Lifelog/main/data/";
        return new Promise((resolve, reject) => {
            $.getJSON(`${githubURL}/map_${this.mode}.json`, data => {
                resolve(data);
            });
        })
    }

    populate_tag_container(array, data, subset=false){
        for(let i=0; i<array.length; i++){
            let fileName = array[i],
                tagString = "";
            for(let j=0; j<data[fileName].length; j++){
                let tag = data[fileName][j];
                if (tag == this.query["label1"]){
                    tagString += `<span style='background: yellow'>${tag}, </span>`;
                } else if (tag == this.query["label2"]){
                    tagString += `<span style='background: lightgreen'>${tag}, </span>`;
                } else {
                    tagString += `${tag}, `;
                }
            }
            tagString = `<br><span class='tags'>${tagString}</span>`;
            let divs = $(`div[name='${fileName}']`);
            for(let k=0; k<divs.length; k++){
                let item = $(divs[k]);
                if (subset && item.hasClass('grid-item') && item.is('div')) {
                    item.append(tagString);
                } else {
                    item.append(tagString);
                }
            }
        }
    }

    populate_image_container(data, subset=false, numArray=[]){
        let intersect = new Set([]),
            a = new Set(data[this.query['label1']]),
            b = new Set(data[this.query['label2']]);
        if (query['label2'] == ''){
            intersect = a;
        } else {
            intersect = new Set([...a].filter(i => b.has(i)));
        }

        let intersect_array = null;
        if (subset){
            intersect_array = this.order_image_array_with_subset(Array.from(intersect), numArray)
        } else {
            intersect_array = this.order_image_array(Array.from(intersect));
        }
        this.fetch_images(intersect_array);
        return intersect_array;
    }

    fetch_images(array){
        let url = `https://storage.googleapis.com/hdi-final-project/frames/${this.mode}/`,
            rowNum = 0,
            rowName = null;
        for (var i=0; i<array.length; i++){
            let full_url = `${url}${array[i]}`,
                imageElement = `<div class='imgTagContainer align-top' name='${array[i]}' onClick='hello(this)'><img src='${full_url}' ></div>`,
                modulo = i % 4;

            if (modulo == 0){
                rowName = `row-${rowNum}`;
                let rowElement = `<div class='imageRow' name=${rowName}></div>`
                this.imageContainer.append(rowElement)
                rowNum += 1
            }
            this.imageContainer > $(`div[name='${rowName}']`).append(imageElement)
        }
        this.add_image_counts(array.length);
    }

    no_results(){
        let noResultsText = "<h4>&#x1F614; No Results &#x1F614;<h4>"
        this.imageContainer.append(noResultsText);
        this.add_image_counts(0);
    }
}