var arr = [];
var sub_ul;

function callAPI(){
    var data = null;
    var song = [];

    var request = new XMLHttpRequest();
    console.log("1 - request object created");

    request.withCredentials = true;
    var string = readQuery();
    request.open("GET", "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + string);
    console.log("2 - opened request file");

    request.onreadystatechange = function() {
        console.log("3 - readystatechange event fired.");

        if (request.readyState == 4 && request.status == 200) {
            result = request.responseText;

            arr = JSON.parse(result);

            var count = 0;
            while (count < arr.data.length){
                var newSong = Song(arr.data[count].title, arr.data[count].duration);
                song.push(newSong);
                console.log(arr.data[count].title);
                count++;

            }
            display();
        }

    }

    request.setRequestHeader("x-rapidapi-host", "deezerdevs-deezer.p.rapidapi.com");
    request.setRequestHeader("x-rapidapi-key", "5f84fe5ed1mshefc31d06d184bf0p152db1jsn2dcbf2c25fd3");

    request.send(data);
}


function readQuery(){
    var queryString = document.forms.query.string.value;
    return queryString;
}

function Song(songname, duration){
    this.songname = songname;
    this.duration = duration;
}

function display(){
    sub_ul= $('<ul/>').appendTo("#main");

    sub_ul.attr('id', 'list');
    // dynamically creates li and ul elements
    var count = 0;
    while (count < arr.data.length){
        var sub_li = $('<li/>').html(arr.data[count].title+'<br/>'+"Duration (sec): " + arr.data[count].duration);
        sub_ul.append(sub_li);
        count++;
    }
}

function onlyDisplay(){
    var newUl = $('<ul/>');
    newUl.attr('id', 'list2');
    var count = 0;
    while (count < arr.data.length){
        var sub_li = $('<li/>').html(arr.data[count].title+'<br/>'+"Duration (sec): " + arr.data[count].duration);
        sub_ul.append(sub_li);
        count++;
    }
    // replaces the elements with an old one
    $('#list').replaceWith(newUl);
}