document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const cuisineTags = document.querySelectorAll('#cuisineTags .tag');
    const footerBtn = document.getElementById('footerBtn');
    const peopleSelect = document.getElementById('peopleSelect');
    const dishSelect = document.getElementById('dishSelect');
    
    // Initialize variables
    let selectedCuisines = [];
    let isPeopleSelected = false;
    let isDishSelected = false;

    // Cuisine selection
    cuisineTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Toggle selected class
            this.classList.toggle('selected');
            
            const cuisine = this.getAttribute('data-cuisine');
            
            // Add or remove from selected cuisines
            if (this.classList.contains('selected')) {
                if (!selectedCuisines.includes(cuisine)) {
                    selectedCuisines.push(cuisine);
                }
            } else {
                selectedCuisines = selectedCuisines.filter(item => item !== cuisine);
            }
            
            updateFooterButton();
        });
    });

    // People selection
    peopleSelect.addEventListener('change', function() {
        isPeopleSelected = this.value !== '';
        updateFooterButton();
    });

    // Dish selection
    dishSelect.addEventListener('change', function() {
        isDishSelected = this.value !== '';
        updateFooterButton();
    });

    // Update footer button state
    function updateFooterButton() {
        const allSelected = selectedCuisines.length > 0 && 
                          isPeopleSelected && 
                          isDishSelected;
        footerBtn.disabled = !allSelected;
    }

    // Footer button action
    footerBtn.addEventListener('click', function() {
        if (this.disabled) return;

        // Prepare booking data
        const bookingData = {
            people: peopleSelect.value,
            cuisines: selectedCuisines,
            dish: dishSelect.value
        };

        // Store in session storage
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
        
        // Redirect to bill page
        window.location.href = "bill.html";
    });

    // Back arrow function
    window.goBack = function() {
        window.history.back();
    }
});