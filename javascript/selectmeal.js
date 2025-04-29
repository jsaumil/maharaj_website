document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const mealTags = document.querySelectorAll('.tag');
    const proceedBtn = document.getElementById('proceedBtn');
    const datePicker = document.getElementById('datePicker');
    const backArrow = document.querySelector('.back-arrow');
    
    // Initialize variables
    let selectedMeals = [];
    let isDateSelected = false;

    const today = new Date().toISOString().split('T')[0];
      datePicker.setAttribute('min', today);
  
    // Back arrow functionality
    backArrow.addEventListener('click', goBack);
  
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
    datePicker.addEventListener('change', (e) => {
      isDateSelected = e.target.value !== '';
      updateProceedButton();
      
      // For debugging - you can remove this
      console.log('Selected date:', e.target.value);
    });

    function goBack() {
      window.history.back();
    }
  
    // Update proceed button state
    function updateProceedButton() {
      proceedBtn.disabled = !(selectedMeals.length > 0 && isDateSelected);
    }
  
    // Proceed button action
    proceedBtn.addEventListener('click', () => {
      // Here you would typically submit the form or navigate to next page
      alert(`Selected Date: ${datePicker.value}\nSelected Meals: ${selectedMeals.join(', ')}`);
      // window.location.href = "next-page.html";
    });
  });