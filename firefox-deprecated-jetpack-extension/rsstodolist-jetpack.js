jetpack.future.import("storage.simple");

var server = 'http://rsstodolist.appspot.com/';
var datastore = jetpack.storage.simple;
var descriptionDefaultMessage = "Your description here";

function send(widget, button) {
  var feedName = $("#feed", widget).val();
  if (feedName != '') {

    datastore.feed = { name: feedName }; // Saving feed name

    var url = jetpack.tabs.focused.url;
    var encodedUrl = encodeURIComponent(url);
    var action = button.attr('id');
    var done = button.attr('data-done');
    var doing = button.attr('data-doing');
    var description = $('#description',widget).val();
    var descriptionParam = (description != '' && description != descriptionDefaultMessage) ? '&description=' + encodeURIComponent(description) : '';
    var request = new XMLHttpRequest();
    
    var rssTodoListUrl = server + action + "?name=" + feedName + "&url=" + encodedUrl + descriptionParam;
    console.log(rssTodoListUrl);
    request.open("GET", rssTodoListUrl, true);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                $('#description', widget).val(descriptionDefaultMessage);
                jetpack.notifications.show({title: 'URL '+ done +' to rssdotolist', body: 'URL ['+ url +'] '+ done +' to feed '+feedName});
            } else 
                jetpack.notifications.show({title: 'Error while '+ doing +' URL to rssdotolist', body: 'Problem while '+ doing +' URL [' + url + '] to feed '+feedName});
        }
    };
    request.send(null);
  }
}

jetpack.statusBar.append({
  html: <>
    <style><![CDATA[
      body,input {font-family: sans-serif; font-size: 9pt; background-color: transparent; color: black;}
      input[type=image] { border: 0; }
      input#feed { width: 75px; background-color: #E3E9EF;}
      input#description { width: 150px; background-color: #E3E9EF; }
      input { border: 1px solid grey; }
      a { border-bottom: 1px solid #63ADF5; cursor: pointer; }
    ]]></style>
    <body>
    <input type="text" id="description"/>
    <input type="image" id="add" data-done="added" data-doing="adding" alt="add current url" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALqSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTCsOvtK4Y9d28yfPzOxvD78hkG1/9cTJFAZQABBDHgx3eIs379YmDYVsXAoOnFwKBoA3Hujb0MW06sZjjH+onB3taCQUZIlWH/1Q0MG6+8ZpyYI9UDEEBMEBf8hIYD0IDHFxgYLm2EuAKckP4yrH90jcFAQ5/hL9NfBn1JV4a/jL8ZLHStQCqyAQII4oLPbxgYvn6EpIe/IEMuMjBMcoUYAMSvgPKsjDwMnprJYOXFzrMYNl+eBmRt4gAIIIgBV14tYpC/ac7AJ64OSbbQ1Pf/Hzg1fr5/h+Hqs2MMF58dYahwnc/QsSuRgYOZHex5gABihOdGd8a5DCrsiQzsXP/BfgcLAyMdKD/jHxvjHkURBis9GwZVCUOG28DUeezSEYYn9z/2AgQQI7HZ2SJHqgNIZQExL8jTQDztxJRnFQABBgCsaTGqudZSmgAAAABJRU5ErkJggg%3D%3D'/>
    <input type="image" id="del" data-done="deleted" data-doing="deleting" alt="delete current url" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALwSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAEEMeDXN4jtIAO+A534+h4Dw+3dDAzKQM3qvkDsAwxMoAtPzwd65z/ENd9+grUCBBDEgO9Ajb+Bgj+BgjaVoEBhYLi5nYHh8jqgONDZJvHAmPJjYHgGDJN7RxkYfgBd8ANiAEAAQQ34BnEFyABRTUi0gQLsF9DWC2uAsaTC8OTSRYYna+cxfH36iIGV/xiDLM8fJqBHGQACCGLAj+8QZ/36xcCwrYqBQdOLgUHRBuLcG3sZnqyfyvD+5RMGg4hsBnZFbYbvl3YxXD+8m/GOC2suQAAxQVzwExoOQAMeX2BguLQR4gpwQvrLcP/wNgYV+wAGjrsHGBgXRjJw3VvPIC8vDAzP/4UAAQRxwec3DAxfP0LSw1+QIRcZGCa5QgwA4l+fvgLTD9DBXkWIPNAgycD8j1EBIIAgBlx5tYhB/qY5A5+4OiTZQlPf/3/g1MjKy8Hw7cJWBu5NWQw/v79g+Aay8xMzw19mhmcAAcQIz43ujHMZVNgTGdi5/oP9DhYGRjpQ/tEXNsaXzIIMMsJ/GFiYnjB8fv2H4cFL5r+/f/yvAwggRmKz89EIuYqv756lM/9llP/L/P8pUNd0911/2gACDABZRTl8tLqdqAAAAABJRU5ErkJggg%3D%3D'/>
    to <input type="text" id="feed" value="somename"/>    
    <a id="link"><img alt="go to that feed" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMBSURBVHjaYvz//z8DJQAggFjAZCsjN4Omrj+DmMVSBlY+Boa/fyCy/35D2P/+QjGQ/fMLA8PLSzMYku9mgpQABBDEAC2jXAaVeFsGaWcGBkZmBobfP0C6GRhArvvzHWoYlA8ygP90BsNEER6G/DexAAEEMUDYoJ1B3IaB4cNtBoYvLxgYvj8D2vwbqglo818Q/gdxAYcEA4OQLgMDt1IMUGcsQABBDPjPDFH46gwDg3kj0IC3DAyf7jMwvLnKwPDiPMT5IK+ADPn5kIGBVwnIBkIgAAggiAG/f0IU/PoJ8QKXGASLmwJpaQaGO9uAGr9CXPKfEagO6K3vEK8BBBDEgJ9AP397D5QA0keALuBXZGAQ1WFgkDBiYFByB1oA9M6NzUB17yAG/PwM0QMEAAHEBCZ/fYPYDjLgPdCJd/YyMBzrZ2C4uISB4cdHBgZ1H4aK77cY0n7dhWgEuebbT7BWgACCGPAdKPgbKPgTKGhRysBgU87AIGbAwHB5HQPDlQ1gJT+ANsuIaDJE/AYG9A+gC35ADAAIIIgXvn+DuAJkgKgmWKhgdwYocBh+XZvM8OvyRAZJQRUGTQlzhs8/vjJ43lnEsO3PX0agZxgAAghiwI/vEGf9+sXAsK2KgUHTi+HPv18MrtrxDH///wMG/l9gqvjP8OzjYwZdGWuGL8BAtPpxkOlrCxMjQABBXfATGg5AAx5fAAfajz+/wJofvr3N8BsY/3+AqfI3MG18Agaggawtw5ff3xhO3j/yAyCAIAZ8fsPA8PUjJD38BRlykeEHxw+GP8CoFeeTA2r+Czbs+cdHDEI8EgznHh9leHHjCMM3RgYBgACCGHDl1SIG+ZvmDHzi6pBk+5fh+8c7DAuP9zD8AnrlJ9A1iiJaDBZKbgynHx5heHrzAMPG7QxzuS78/w4QQIzw3OjOOJdBhT2RgZ3rP8M/oBhYGBj0/yFsW9EvjMoKjgxvr+xlWLaFIZ/32v9JIBUAAcRIbHZWqmN8/fcfs8j3f39ZX7X9/wMTBwgwAD5jU2E9CK0iAAAAAElFTkSuQmCC'/></a>
     </body>
  </>, // Above icons comes from http://famfamfam.com/lab/icons/silk/ - Many thanks :)
  width: 320,
  onReady: function(widget){
     
     $('#description', widget).val(descriptionDefaultMessage);
     
    if (datastore.feed && datastore.feed.name != '')
        $("#feed", widget).val(datastore.feed.name); // Restoring last feed name

    $("#link", widget).click(function(){
         var tab = jetpack.tabs.open(server + '?name=' + $("#feed", widget).val());
         tab.focus();
    });

    $("#add", widget).click(function() { send(widget, $("#add", widget)); });
    $("#del", widget).click(function() { send(widget, $("#del", widget)); });
    $("#description", widget).focus(function() { if ($('#description',widget).val()==descriptionDefaultMessage) $('#description',widget).val('') });
    $("#description", widget).blur(function() { if ($('#description',widget).val()=='') $('#description',widget).val(descriptionDefaultMessage) });
  }
});

