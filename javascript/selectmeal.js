document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const mealTags = document.querySelectorAll('.tag');
    const proceedBtn = document.getElementById('proceedBtn');
    const dateSelect = document.getElementById('dateSelect');
    const backArrow = document.querySelector('.back-arrow');
    
    // Initialize variables
    let selectedMeals = [];
    let isDateSelected = false;
  
    // Back arrow functionality
    backArrow.addEventListener('click', () => {
      window.history.back();
    });
  
    // Toggle meal selection
    mealTags.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
        const mealType = tag.getAttribute('data-meal');
        
        if (tag.classList.contains('selected')) {
          selectedMeals.push(mealType);
        } else {
          selectedMeals = selectedMeals.filter(m => m !== mealType);
        }
        
        updateProceedButton();
      });
    });
  
    // Date selection handler
    dateSelect.addEventListener('change', (e) => {
      isDateSelected = e.target.value !== 'select from here';
      updateProceedButton();
    });
  
    // Update proceed button state
    function updateProceedButton() {
      proceedBtn.disabled = !(selectedMeals.length > 0 && isDateSelected);
    }
  
    // Proceed button action
    proceedBtn.addEventListener('click', () => {
      // Here you would typically submit the form or navigate to next page
      alert(`Selected Date: ${dateSelect.value}\nSelected Meals: ${selectedMeals.join(', ')}`);
      // window.location.href = "next-page.html";
    });
  });