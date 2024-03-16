$(document).ready(function(){
    console.log("Document ready"); // Debug log
    
    // Add horizontal class to column titles initially
    $(".column-title").addClass("horizontal");

    // Function to handle column click
    function handleColumnClick(clickedColumn) {
        // Collapse all columns except the clicked one
        $(".column").removeClass("expanded").addClass("compressed");
        
        // Check if the clicked column is already expanded
        var isExpanded = clickedColumn.hasClass("expanded");
        if (!isExpanded) {
            // Add expanded class to the clicked column
            clickedColumn.addClass("expanded").removeClass("compressed");
            // Toggle the vertical class on the column title
            clickedColumn.find(".column-title").addClass("vertical");
            // Toggle the hidden class on the text
            clickedColumn.find(".text").removeClass("hidden");
            // Show the images
            clickedColumn.find(".images").css("height", "auto");
            console.log("Column expanded"); // Debug log
        } else {
            console.log("Column collapsed"); // Debug log
        }
        
        // Adjust the flex of the columns based on their state
        adjustColumnFlex();
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

    // Ensure that no column is initially expanded or compressed
    $(".column").removeClass("expanded compressed");
    $(".column-title").removeClass("vertical");

    // Function to adjust the flex of the columns
    function adjustColumnFlex() {
        // Calculate the number of expanded columns
        var expandedColumnsCount = $(".column.expanded").length;
        // Calculate the flex basis for each column
        var flexBasis = (100 / expandedColumnsCount) + "%";
        // Set the flex basis for each expanded column
        $(".column.expanded").css("flex", "0 0 " + flexBasis);
    }

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
