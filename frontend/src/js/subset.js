class Subset {
    constructor(mode){
        this.mode = mode;
        this.numImages = 0;
        this.rowNum = 0;
        this.fileNames = [];
        this.imageContainer = $("div[id='subsetImages']");
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.numImages = 0;
        this.fileNames = [];
        // this.unpopulate_subsets();
    }

    add_image(target) {
        console.log(target);
        let imageDiv = target.clone();
        imageDiv.removeClass('imgTagContainer');
        imageDiv.removeClass('imgTagClicked');
        imageDiv.addClass('grid-item');
        this.imageContainer.append(imageDiv);
    }

    remove_image(imageDiv) {
        console.log(imageDiv);
    }
}