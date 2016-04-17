$.ajax({
    "url":$("#index_image_url").val(),
    "success":function(data){
        var jsonData = JSON.parse(data);
        var list = jsonData[0].images;
        for(var i = 0;i<list.length-1;i++){
            var o = list[i];
            var liHtml = '<li><img src="'+o.url+'" alt="'+o.title+'"></li>';
            $("#myRoundabout").append(liHtml);
        }
        $('#myRoundabout').roundabout({
            shape: 'square',
            minScale: 0.93, // tiny!
            maxScale: 1, // tiny!
            easing: 'easeOutExpo',
            clickToFocus: 'true',
            focusBearing: '0',
            duration: 800,
            reflect: true
        });
    }
});