$(document).ready(function(){
    var currentSlide = 1;
    var totalSlides = $('.slide').length;

    function showSlide(index) {
        $('.slide').hide();
        $('#slide' + index).show();
    }

    $('.slideshow').click(function(){
        currentSlide++;
        if (currentSlide > totalSlides) {
            currentSlide = 1;
        }
        showSlide(currentSlide);
    });

    // Show the first slide initially
    showSlide(currentSlide);

    // Open popup window when an image is clicked
    $('.slide .image-column img').click(function(event){
        event.stopPropagation(); // Prevent the click event from propagating to the parent container (slideshow)
        var imageUrl = $(this).attr('src');
        var popupWindow = window.open(imageUrl, '_blank', 'width=600,height=400');
        
        // Close popup window when clicked off of
        $(popupWindow).blur(function(){
            popupWindow.close();
        });
    });
});
