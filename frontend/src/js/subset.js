class Subset {
    constructor(mode){
        this.mode = mode;
        this.numImages = 0;
        this.imageNames = [];
        this.imageContainer = $("div[id='subsetImages']");
    }

    get_imageNames(){
        return this.imageNames;
    }

    change_mode(new_mode){
        this.mode = new_mode;
        this.numImages = 0;
        this.imageNames = [];
        this.unpopulate_subsets();
    }

    sort_names(unordered_names, numbers_only=false){
        let numbers = [];
        for(let i=0; i<unordered_names.length; i++){
            let number = unordered_names[i].split(".")[0];
            numbers.push(number)
        }
        if (numbers_only) { return numbers }
        numbers = numbers.sort((a,b)=>a-b).map(a => a + '.jpg')
        return numbers;
    }

    add_imageName(name){
        this.imageNames.push(name);
        this.imageNames = this.sort_names(this.imageNames);
        this.numImages += 1;
    }

    unpopulate_subsets(){
        this.imageContainer.children().remove()
    }

    find_neighbor(name){
        let curNumber = name.split(".")[0],
            numbers = this.sort_names(this.imageNames, true);
        for(let i=0; i<numbers.length-1; i++){
            console.log(`${numbers[i]} <= ${curNumber}: ${numbers[i] <= curNumber} && ${curNumber} < ${numbers[i+1]}: ${curNumber < numbers[i+1]}`);
            if (numbers[i] <= curNumber && curNumber < numbers[i+1]) {
                console.log("found it");
                console.log(numbers[i+1])
                return $('#subsetImages').find(`div[name='${numbers[i+1]}.jpg']`)
            }
        }
        return null;
    }

    insert_image(imageDiv, name){
        this.imageNames.push(name);
        this.imageNames = this.sort_names(this.imageNames);
        let neighborDiv = this.find_neighbor(name);
        console.log(neighborDiv);
        if (neighborDiv == null){
            this.imageContainer.append(imageDiv);
        } else {
            $(imageDiv).insertBefore($(neighborDiv));
        }

        this.numImages += 1;
    }

    add_image(target) {
        let imageDiv = target.clone();
        imageDiv.removeClass('imgTagContainer');
        imageDiv.removeClass('imgTagContClicked');
        imageDiv.prop("onclick", null).off("click");
        imageDiv.addClass('grid-item');
        // let idName = $(imageDiv).attr('name').split(".")[0];
        // $(imageDiv).prop({'id': idName});
        this.insert_image(imageDiv, $(imageDiv).attr('name'));
    }

    remove_imageName(name) {
        this.imageNames = this.imageNames.filter(a => a != name)
        this.numImages -= 1;
    }

    remove_image(imageDiv) {
        let name = $(imageDiv).attr('name');
        $('#subsetImages').find(`div[name='${name}']`).remove();
        this.remove_imageName(name);
        
    }
}