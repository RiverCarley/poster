$(document).ready(function(){
    console.log("Document ready"); // Debug log
    
    // Add horizontal class to column titles initially
    $(".column-title").addClass("horizontal");

    // Function to handle column click
    function handleColumnClick(clickedColumn) {
        // Check if the clicked column is already expanded
        var isExpanded = clickedColumn.hasClass("expanded");
        if (isExpanded) {
            // Remove expanded class from the clicked column
            clickedColumn.removeClass("expanded");
            // Hide all images except the first one in each column
            $(".column .images").css("height", 0);
            console.log("Column compressed"); // Debug log
        } else {
            // Collapse all columns except the clicked one
            $(".column").not(clickedColumn).removeClass("expanded");
            
            // Toggle the expanded class on the clicked column
            clickedColumn.addClass("expanded");
            // Toggle the vertical class on the column title based on the column's state
            $(".column").each(function() {
                var isCompressed = !$(this).hasClass("expanded");
                $(this).find(".column-title").toggleClass("vertical", isCompressed);
                // Toggle the hidden class on the text based on the column's state
                $(this).find(".text").toggleClass("hidden", isCompressed);
                // Set the flex value of the expanded column
                var flexValue = isCompressed ? "1" : "30"; // Adjust flex value as needed
                $(this).css("flex", flexValue);
                // Set the height of images when the column is expanded
                $(this).find(".images").css("height", isCompressed ? 0 : "auto");
            });
            console.log("Column expanded"); // Debug log
        }
    }

    // Click event handler for columns
    $(".column").on("click", function(){
        console.log("Column clicked"); // Debug log
        handleColumnClick($(this));
    });

    // Touch event handler for columns
    $(".column").on("touchend", function(e){
        e.preventDefault(); // Prevent default touch behavior
        console.log("Column touched"); // Debug log
        handleColumnClick($(this));
    });

    // Ensure that no column is initially expanded
    $(".column").removeClass("expanded");

    // Function to cycle images
    function cycleImages() {
        $(".column").each(function() {
            var activeImage = $(this).find(".images img.active");
            var nextImage = activeImage.next("img");
            if (nextImage.length === 0) {
                nextImage = $(this).find(".images img").first();
            }
            activeImage.removeClass("active").hide();
            nextImage.addClass("active").show();
            nextImage.appendTo($(this).find(".images"));
        });
    }

    // Hide all images initially
    $(".images img").hide();

    // Call the cycleImages function every 1 second
    setInterval(cycleImages, 1000);
});
