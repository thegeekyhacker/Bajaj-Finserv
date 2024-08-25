
let responseData = {};  // Global variable to store the API response

function submitData() {
    const jsonInput = document.getElementById('json-input').value;
    try {
        // Parse JSON input
        const data = JSON.parse(jsonInput);

        // Check if the input has a valid 'data' array
        if (!Array.isArray(data.data)) {
            alert('Invalid JSON format: "data" should be an array');
            return;
        }

        const payload = { data: data.data };

        // Make POST request to the API
        fetch('/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            // Store the response in a global variable
            responseData = data;

            // Show the dropdown
            document.getElementById('filter-dropdown').style.display = 'block';

            // Initially display the full response
            displayResponse();
        })
        .catch(error => {
            document.getElementById('response-container').innerHTML = '<p>Error processing request</p>';
        });
    } catch (error) {
        alert('Invalid JSON input');
    }
}

function displayResponse(filteredData = null) {
    let data = filteredData || responseData;  // Use filtered data if provided
    let responseHTML = '';

    // Numbers category
    if (data.numbers && data.numbers.length > 0) {
        responseHTML += `<p>Numbers: ${data.numbers.join(', ')}</p>`;
    } else if (!filteredData || filteredData.numbers !== undefined) {
        responseHTML += `<p>Numbers: No valid numbers found</p>`;
    }

    // Alphabets category
    if (data.alphabets && data.alphabets.length > 0) {
        responseHTML += `<p>Alphabets: ${data.alphabets.join(', ')}</p>`;
    } else if (!filteredData || filteredData.alphabets !== undefined) {
        responseHTML += `<p>Alphabets: No valid alphabets found</p>`;
    }

    // Highest lowercase alphabet category
    if (data.highest_lowercase_alphabet && data.highest_lowercase_alphabet.length > 0) {
        responseHTML += `<p>Highest lowercase alphabet: ${data.highest_lowercase_alphabet.join(', ')}</p>`;
    } else if (!filteredData || filteredData.highest_lowercase_alphabet !== undefined) {
        responseHTML += `<p>Highest lowercase alphabet: No valid lowercase alphabets found</p>`;
    }

    document.getElementById('response-container').innerHTML = responseHTML;
}

function filterResponse() {
    const filterDropdown = document.getElementById('filter-dropdown');
    const selectedFilter = filterDropdown.value;

    // Create a new object to hold the filtered data
    let filteredData = {};

    if (selectedFilter === 'Numbers') {
        filteredData.numbers = responseData.numbers;
    } else if (selectedFilter === 'Alphabets') {
        filteredData.alphabets = responseData.alphabets;
    } else if (selectedFilter === 'Highest lowercase alphabet') {
        filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    } else if (selectedFilter === 'All') {
        filteredData = responseData; // Display all data
    }

    // Display the filtered response
    displayResponse(filteredData);
}
