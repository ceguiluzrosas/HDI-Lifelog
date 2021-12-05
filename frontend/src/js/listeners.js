let MT = new ModeToggler("beach"),
    Q = new ImageQuery("beach"),
    SUB = new Subset("beach"),
    CUR_INPUT = null;

Q.add_options();

$('.searchInput').keyup(function(e){
    let id = e.target.id,
        inputName = id.split("Input")[0],
        input = $(`#${inputName}Input`)[0],
        filter = input.value.toUpperCase(), 
        a = $(`#${inputName}Dropdown > a`);
    CUR_INPUT = $(a).parent().children("input[type='text']")[0];
    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
        } else {
            a[i].style.display = "none";
        }
    }
});

$(`body`).click(function(e){
    if (e.target.type != "text"){
        $(CUR_INPUT).parent().children("a").css({"display": "none"})
        // CUR_INPUT = null;
    }   
});

$(".dropdown-content").click(function(e){
    if ($(e.target).is('a')) {
        CUR_INPUT.value = e.target.text;
    }
});

function hello(e){
    let ele = $(e);
    while (!(ele.is('div') && ele.hasClass('imgTagContainer'))) {
        ele = ele.parent();
    }
    if (ele.hasClass('imgTagContClicked')){
        ele.removeClass('imgTagContClicked');
        SUB.remove_image(ele);
    } else {
        ele.addClass('imgTagContClicked');
        SUB.add_image(ele);
    }
}

$("button[id='regularSearch']").click(function(e){
    console.log("regularSearch");
    MT.save_data("reg");
    MT.log_time();
    Q.query_images(query=MT.recentQuery);
});

$("button[id='subSearch']").click(function(e){
    console.log("innerSearch");
    MT.save_data("sub");
    MT.log_time();
    Q.query_sub_images(query=MT.recentQuery, numArray=SUB.get_imageNames());
});

$("a[id='download']").click(function(e){
    console.log("download");
    let data = [{"hello": "there"}], // MT.get_data() concatenate Q.get_data()
        encodedUri = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));;
    $("a[id='download']").attr("href", encodedUri);
});

$("input[type='radio'").click(function(e){
    let mode = e.target.id;
    if (mode != MT.mode){
        // MT.clear_inputs();
        MT.change_mode(new_mode=mode);
        Q.change_mode(new_mode=mode);
        SUB.change_mode(new_mode=mode);
    }
});