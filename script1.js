$(document).ready(function() {
    // Image animation
    $('.moving-image').each(function() {
        var randomTop = Math.floor(Math.random() * 1500) + 10; // Random top position between 10% and 90%
        $(this).css({
            top: randomTop ,
            left: '-100%', // Start position off-screen to the left
            opacity: 0, // Set initial opacity to 0
            display: 'none' // Hide the image initially
        });
        animateImage($(this)); // Start animation for each image
    });

    // Function to animate image
    function animateImage(image) {
        var randomDuration = Math.floor(Math.random() * 8000) + 3000; // Random duration between 3000ms and 11000ms
        var windowWidth = $(window).width();
        var endPosition = windowWidth / 1.5; // End position at half the width of the window
        var fadeStartPosition = endPosition * 0.1; // Start fading in when image is 10% done with loop
        var fadeEndPosition = endPosition * 0.9; // Start fading out when image is 90% done with loop
        image.animate({left: endPosition}, {
            duration: randomDuration,
            easing: 'linear',
            step: function(now, fx) {
                // Check if image is within fade in range
                if (fx.prop === 'left' && now <= fadeStartPosition) {
                    // Calculate opacity based on position within fade range
                    var fadeRange = fadeStartPosition;
                    var fadeProgress = now;
                    var opacity = fadeProgress / fadeRange;
                    image.css('opacity', opacity);
                }
                // Check if image is within fade out range
                else if (fx.prop === 'left' && now >= fadeEndPosition) {
                    // Calculate opacity based on position within fade range
                    var fadeRange = endPosition - fadeEndPosition;
                    var fadeProgress = now - fadeEndPosition;
                    var opacity = 1 - (fadeProgress / fadeRange);
                    image.css('opacity', opacity);
                }
            },
            complete: function() {
                // Calculate new random position
                var randomTop = Math.floor(Math.random() * 1500) + 10; // Random top position between 10% and 90%

                image.css({
                    top: randomTop, // Set new random top position
                    left: -image.width(), // Start position off-screen to the left
                    opacity: 0 // Reset opacity to 0
                }).fadeIn(); // Fade in the image after completing one pass
                animateImage(image); // Restart animation
            }
        });
    }

    // Pop-up window
    $('.moving-image').click(function() {
        $('#popup').fadeIn();
    });
    $('.image-container2').click(function() {
        $('#popup2').fadeIn();
    });
    $('.image-container3').click(function() {
        $('#popup3').fadeIn();
    });
    $('.image-container4').click(function() {
        $('#popup4').fadeIn();
    });
    $('.close').click(function() {
        $('#popup, #popup2,#popup3,#popup4').fadeOut();
    });

    // Close popups when clicking outside of them
    $(document).click(function(event) {
        if (!$(event.target).closest('.popup-content, .moving-image').length) {
            $('#popup, #popup2,#popup3,#popup4').fadeOut();
        }
    });

    // Prevent closing popups when clicking inside them
    $('.popup-content').click(function(event) {
        event.stopPropagation();
    });

    // Fade out h1 and h2
    $('h1, h2').fadeOut(8000); // Adjust the duration as needed

    // Additional code for popup animation
    // Pop-up window animation
    $('.popup').addClass('show'); // Add the 'show' class to display the popup
});
