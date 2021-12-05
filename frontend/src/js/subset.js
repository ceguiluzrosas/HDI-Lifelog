class Subset {
    constructor(mode){
        this.mode = mode;
        this.numImages = 0;
        this.imageNames = [];
        this.imageContainer = $("div[id='subsetImages']");
        this.regSearchBttn = $("button[id='regularSearch']");
        this.subSearchBttn = $("button[id='subSearch']");
    }

    get_imageNames(){
        return this.imageNames;
    }

    clear_everything(){
        this.numImages = 0;
        this.imageNames = [];
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.clear_everything();
        this.unpopulate_subsets();
    }

    sort_names(unordered_names){
        return unordered_names.sort((a,b)=>a-b)
    }

    unpopulate_subsets(){
        this.imageContainer.children().remove()
    }

    find_neighbor(name){
        let curNumber = name.split(".")[0];
        for(let i=0; i<this.imageNames.length-1; i++){
            if (this.imageNames[i] <= curNumber && curNumber < this.imageNames[i+1]) {
                console.log("found it");
                console.log(this.imageNames[i+1])
                return $('#subsetImages').find(`div[name='${this.imageNames[i+1]}.jpg']`)
            }
        }
        return null;
    }

    insert_image(imageDiv, imgName){
        let name = imgName.split(".")[0];
        this.imageNames.push(name);
        this.imageNames = this.sort_names(this.imageNames);
        let neighborDiv = this.find_neighbor(name);
        console.log(neighborDiv);
        if (neighborDiv == null){
            this.imageContainer.append(imageDiv);
        } else {
            $(imageDiv).insertBefore($(neighborDiv));
        }
        this.update_numImages(1);
        console.log(this.imageNames);
    }

    add_image(target) {
        let imageDiv = target.clone();
        imageDiv.removeClass('imgTagContainer');
        imageDiv.removeClass('imgTagContClicked');
        imageDiv.prop("onclick", null).off("click");
        imageDiv.addClass('grid-item');
        this.insert_image(imageDiv, $(imageDiv).attr('name'));
    }

    remove_imageName(name) {
        this.imageNames = this.imageNames.filter(a => a != name)
        console.log(this.imageNames);
        this.update_numImages(-1);
    }

    remove_image(imageDiv) {
        let name = $(imageDiv).attr('name').split(".")[0];
        console.log(name);
        $('#subsetImages').find(`div[name='${name}.jpg']`).remove();
        this.remove_imageName(name);
        console.log(this.imageNames);
    }

    update_numImages(value){
        this.numImages += value;
        if (this.numImages == 0) {
            this.subSearchBttn.css({'display': 'none'});
            this.regSearchBttn.css({'display': 'block'});
        } else {
            this.regSearchBttn.css({'display': 'none'});
            this.subSearchBttn.css({'display': 'block'});
        }
        console.log(this.numImages)
    }
}