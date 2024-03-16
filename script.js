$(document).ready(function(){
    console.log("Document ready"); // Debug log
    
    // Function to handle column click
    function handleColumnClick(clickedColumn) {
        // Check if the clicked column is already expanded
        var isExpanded = clickedColumn.hasClass("expanded");
        if (isExpanded) {
            // Reset the clicked column to its initial state
            clickedColumn.removeClass("expanded");
            $(".column.expanded, .column.compressed").removeClass("expanded compressed");
            $(".column-title").css("writing-mode", "").css("-webkit-writing-mode", ""); // Reset writing-mode property
            $(".column.compressed .images").css("height", 0);
            console.log("Column compressed"); // Debug log
        } else {
            // Collapse all columns except the clicked one
            $(".column").removeClass("expanded").addClass("compressed");
            // Toggle the expanded/compressed class on the clicked column
            clickedColumn.addClass("expanded").removeClass("compressed");
            // Toggle the writing-mode property on the column title based on the column's state
            $(".column").each(function() {
                var isCompressed = $(this).hasClass("compressed");
                $(this).find(".column-title").css("writing-mode", isCompressed ? "vertical-lr" : "").css("-webkit-writing-mode", isCompressed ? "vertical-lr" : ""); // Apply writing-mode for both standard and webkit
                $(this).find(".text").toggleClass("hidden", !isCompressed);
                if (isCompressed) {
                    $(this).find(".images").css("height", 0);
                } else {
                    $(this).find(".images").css("height", "auto");
                }
            });
            console.log("Column expanded"); // Debug log
        }
    }

    // Click event handler for columns
    $(".column").on("click touchend", function(e){
        // Check if the click was on a link
        if ($(e.target).is("a")) {
            // Allow default behavior for links
            return;
        }
        // Check if the clicked column is already expanded
        var isExpanded = $(this).hasClass("expanded");
        if (!isExpanded) {
            // Collapse the expanded column if any
            $(".column.expanded").removeClass("expanded").addClass("compressed");
        }
        // Prevent default touch behavior for columns
        e.preventDefault();
        console.log("Column clicked"); // Debug log
        handleColumnClick($(this));
    });

    // Ensure that no column is initially expanded or compressed
    $(".column").removeClass("expanded compressed");

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
