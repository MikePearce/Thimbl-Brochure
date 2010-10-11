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
        
        $('#container').load('http://google.com'); // SERIOUSLY!
        
        // Check we're on the right page...
        var url = 'http://www.drumbeat.org/node/109874/blog/feed';
        
        $.ajax({
            type: "GET",
        	url: url,
        	dataType: "xml",
        	success: function(xml) {
        	    console.log(xml)
        	    // // for each blog post
        	    //               $(xml).find('item').each(function(){
        	    //                   alert('moo')
        	    //                   var id = $(this).attr('id');
        	    //                   var title = $(this).find('title').text();
        	    //                   var url = $(this).find('link').text();
        	    //                   $('<div class="items" id="link_'+id+'"></div>').html('<a href="'+url+'">'+title+'</a>').appendTo('#blog');
        	    //               });
        	}
        });
    // And run it
    }(hash);

    
});