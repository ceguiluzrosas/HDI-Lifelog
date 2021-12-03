let MT = new ModeToggler("beach");
    Q = new ImageQuery("beach");
    CUR_INPUT = null;

Q.add_options();

$('.searchInput').click(function(e){
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
        CUR_INPUT = null;
    }   
});

$(".dropdown-content > a").click(function(e){
    let text = e.target.text;
    CUR_INPUT.value = text;
});

$("button[name='submit']").click(function(e){
    console.log("submit");
    MT.save_data();
    MT.log_time();
    Q.query_images(query=MT.recentQuery);
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
        MT.clear_inputs();
        MT.change_mode(new_mode=mode);
        Q.change_mode(new_mode=mode);
    }
});