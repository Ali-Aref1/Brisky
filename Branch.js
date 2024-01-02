document.addEventListener('DOMContentLoaded', () => {
    // Fetch branch names from the server
    fetch('/getBranch')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const branchSelect = document.getElementById('branchSelect');
  
        if (data && data.length > 0) {
            data.forEach((branch) => {
            const newOption = document.createElement('option');
            newOption.value = branch.BranchID; // You may adjust this based on your data structure
            newOption.textContent = branch.Name;
            branchSelect.appendChild(newOption);
          });
            console.log(data);
        } else {
          console.log('No branches found');
        }
      })
      .catch((error) => {
        console.error('Error fetching branch data:', error);
      });
  });