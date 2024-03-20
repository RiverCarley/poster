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
// Function to continuously scroll the div
// Function to continuously scroll the div with throttling
function scrollDiv(event) {
    // Prevent the default scroll behavior
    event.preventDefault();

    // Check if the scrollDiv function has been called recently
    if (!scrollDiv.isThrottled) {
        // Get the target column that triggered the event
        const scrollableDiv = event.currentTarget.querySelector(".images");

        // Clone the first child of the target column and append it to the end
        const firstChild = scrollableDiv.firstElementChild;
        const clone = firstChild.cloneNode(true);
        scrollableDiv.appendChild(clone);

        // Remove the first child of the target column
        scrollableDiv.removeChild(firstChild);

        // Set isThrottled to true to prevent frequent calls
        scrollDiv.isThrottled = true;

        // Allow scrollDiv function to be called again after a delay
        setTimeout(function() {
            scrollDiv.isThrottled = false;
        }, 100); // Adjust the delay as needed to control the scrolling speed
    }
}

// Set initial value of isThrottled to false
scrollDiv.isThrottled = false;

// Get all elements with the class "column" and attach the "wheel" event listener to each one
document.querySelectorAll(".column").forEach(column => {
    column.addEventListener("wheel", scrollDiv);
});


  
  
