let MT = new ModeToggler("beach");
    Q = new ImageQuery("beach");

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