$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        var source = $('#source').val();
        var destination = $('#destination').val();

        // Perform AJAX POST request to the server
        $.ajax({
            type: 'POST',
            url: '/get_path',
            data: JSON.stringify({ source: source, destination: destination }),
            contentType: 'application/json;charset=UTF-8',
            success: function(response) {
                displayPath(response);
            },
            error: function(request, status, error) {
                var errorMsg = 'Error fetching path';
                if (request.responseJSON && request.responseJSON.error) {
                    errorMsg = request.responseJSON.error;
                }
                displayPath({error: errorMsg});
            }
        });
    });

    // Function to display the path
    function displayPath(data) {
    var pathList = $('#pathList');
    pathList.empty();

    if (data.error) {
        pathList.append($('<li>').text(data.error));
    } else {
        var formattedPath = 'Path: ' + data.path.join(' --> ');
        pathList.append($('<li>').text(formattedPath));
        var distanceText = 'Distance: ' + data.distance + ' meters';
        pathList.append($('<li>').text(distanceText));
    }

    // 👇 Smooth scroll to the bottomScroll section
    $('html, body').animate({
        scrollTop: $('#bottomScroll').offset().top
    }, 500);
}


    // Slider functionality
    const slider = $('.slider');
    const images = $('.slider img');
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= images.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = images.length - 1;
        } else {
            currentIndex = index;
        }
        slider.css('transform', 'translateX(' + (-currentIndex * 100) + '%)');
    }

    $('.next').click(function() {
        showSlide(currentIndex + 1);
    });

    $('.prev').click(function() {
        showSlide(currentIndex - 1);
    });

    // Initialize the slider
    showSlide(currentIndex);
});
