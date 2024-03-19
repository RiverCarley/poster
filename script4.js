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
         //   $(".column").css({"flex": "", "transition": "flex 0.5s ease"});
            $(".column-title").css("writing-mode", "");
            console.log("Column compressed"); // Debug log
        } else {
        //    $(".column").css({"flex": "", "transition": "flex 3s ease"});
            // Collapse all columns except the clicked one
            $(".column").removeClass("expanded").addClass("compressed");
            // Toggle the expanded/compressed class on the clicked column
            clickedColumn.addClass("expanded").removeClass("compressed");
            $(".column").each(function() {
                var isCompressed = $(this).hasClass("compressed");
                $(this).find(".column-title").css("writing-mode", isCompressed ? "vertical-lr" : "");
                $(this).find(".text").toggleClass("hidden", !isCompressed);
                
            });
            console.log("Column expanded"); // Debug log
        }
        
        // Adjust the height of the .images container for each column
        $(".column").each(function() {
            var isCompressed = $(this).hasClass("compressed");
            var columnHeight = $(this).height();
            var imagesContainer = $(this).find(".images");
            if (isCompressed) {
                imagesContainer.css("max-height", 0);
            } else {
                imagesContainer.css("max-height", columnHeight);
            }
        });
    }

    // Click event handler for columns
    $(".column").on("click", function(e){
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


    // Event listener for images to prevent column compression
    $(".column .images img").on("click", function(e) {
        e.stopPropagation(); // Stop event propagation to parent column
    });
});
