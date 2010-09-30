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
});