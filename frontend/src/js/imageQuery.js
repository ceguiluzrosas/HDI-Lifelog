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

    add_images(){
        return ;
        let count = 2,
            url = 'https://storage.googleapis.com/mitribu-mobile/social/memes/',
            rowName = null;
        for (var i=8; i<(8+count); i++){
            let full_url = `${url}${i}.png`,
                imageElement = `<img src=${full_url} >`,
                modulo = i % 4;

            if (modulo == 0){
                rowName = `row-${i}`;
                let rowElement = `<div class='imageColumn' name=${rowName}></div>`
                this.imageContainer.append(rowElement)
            }
            this.imageContainer > $(`div[name='${rowName}']`).append(imageElement)
        }
        this.add_image_counts(count);
        console.log("added images...")
    }

    delete_images(){
        this.imageContainer > $('img').remove()
        console.log("deleted images...")
    }

}