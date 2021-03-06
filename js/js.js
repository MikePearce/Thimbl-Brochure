$(document).ready(function(){
    
    // Watch the clicks and append the arros
    var menuWatcher = function() {
        watchClicks();
        $('.' + hash).append('<span id="arrow"></span>')
    }

    // Watch for nav clicks to change the page
    var watchClicks = function() {
        $('.menu').click( function() {
            window.location = $(this).attr('href');
            window.location.reload()
        })
    }
    
    // Grab teh #hash, so we know where to go
    hash = window.location.hash.substring(1) || 'home';

    // Load in the menu
    loadData(
        '/content/menu.html', 
        '#menu', 
        menuWatcher
    );
    
    // Now load the content
    loadData(
        '/content/' + hash + '.html',
        '#content',
        watchClicks
    )

    // Get data from some place
    function loadData(page, container, callback) {
        $(container).load(page, callback);
    }
    
    // Read in the blog
    moo = function getBlogXmlAndDump(hash)
    {
        if (hash != 'blog') {
            return;
        }
        
        // Check we're on the right page...
        var url = 'http://query.yahooapis.com/v1/public/yql?q='+ 
                  'select%20*%20from%20rss%20where%20url%3D%22h'+
                  'ttps%3A%2F%2Fwww.drumbeat.org%2Fnode%2F10987'+
                  '4%2Fblog%2Ffeed%22&format=json';
    
        $.ajax({
            type: "GET",
        	url: url,
        	dataType: "jsonp",
        	success: function(str) {
                // for each blog post
                $(str.query.results.item).each(function(key, value){                                
                    var author  = value.author;
                    var title   = value.title;
                    var url     = value.link;
                    var desc    = value.description;
                    var date    = value.pubDate;
                    $('<div class="items"></div>')
                        .html(
                                '<h3><a href="'+url+'">'+title+'</a></h3>'+
                                '<span class="date">'+ date +'</span><p>'+desc+'</p>'
                        )
                        .appendTo('#blog');
                    $('#pleaseWait').hide();
                });
        	}
        });
    // And run it
    }(hash);

    
});
