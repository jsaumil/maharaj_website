document.addEventListener('DOMContentLoaded', function() {
  // Select elements
  const mealTags = document.querySelectorAll('.tag');
  const proceedBtn = document.getElementById('proceedBtn');
  const datePicker = document.getElementById('datePicker');
  const addDateBtn = document.getElementById('addDateBtn');
  const selectedDatesContainer = document.getElementById('selectedDates');
  const backArrow = document.querySelector('.back-arrow');
  
  // Initialize variables
  let selectedMeals = [];
  let selectedDates = [];

  // Set minimum date to today
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

  // Add date button handler
  addDateBtn.addEventListener('click', () => {
    const dateValue = datePicker.value;
    
    if (!dateValue) {
      alert('Please select a date first');
      return;
    }
    
    // Check if date already selected
    if (!selectedDates.includes(dateValue)) {
      selectedDates.push(dateValue);
      renderSelectedDates();
      updateProceedButton();
    } else {
      alert('This date is already selected');
    }
    
    // Clear the date picker for next selection
    datePicker.value = '';
  });
  
  // Render selected dates as tags
  function renderSelectedDates() {
    selectedDatesContainer.innerHTML = '';
    
    selectedDates.forEach(date => {
      const dateTag = document.createElement('div');
      dateTag.className = 'date-tag';
      
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      dateTag.innerHTML = `
        <span>${formattedDate}</span>
        <span class="remove-date" data-date="${date}">×</span>
      `;
      
      selectedDatesContainer.appendChild(dateTag);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-date').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dateToRemove = e.target.getAttribute('data-date');
        selectedDates = selectedDates.filter(d => d !== dateToRemove);
        renderSelectedDates();
        updateProceedButton();
      });
    });
  }

  function goBack() {
    window.history.back();
  }

  // Update proceed button state
  function updateProceedButton() {
    proceedBtn.disabled = !(selectedMeals.length > 0 && selectedDates.length > 0);
  }

  // Proceed button action
  proceedBtn.addEventListener('click', () => {
    // Here you would typically submit the form or navigate to next page
    // For now, we'll just log the selections
    console.log('Selected Dates:', selectedDates);
    console.log('Selected Meals:', selectedMeals);
    
    // Store selections in localStorage to use on next page
    localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals));
    
    window.location.href = "multiselectdish.html";
  });
});