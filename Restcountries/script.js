document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API
    fetch('https://api.restful-api.dev/objects')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Extract device names
            const devices = getDeviceNames(data);

            // Display devices on the UI
            displayDevices(devices);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Optionally show an error message on the UI
        });

    function getDeviceNames(data) {
        // Initialize an array to store device names
        const deviceNames = [];

        // Iterate through each object in the data
        data.forEach(object => {
            if (object.name) {
                deviceNames.push(object.name);
            }
        });

        return deviceNames;
    }

    function displayDevices(devices) {
        const deviceListElement = document.getElementById('deviceList');
        if (deviceListElement) {
            // Clear any existing content
            deviceListElement.innerHTML = '';

            // Create list items for each device
            devices.forEach(device => {
                const listItem = document.createElement('a');
                listItem.classList.add('list-group-item', 'list-group-item-action');
                listItem.textContent = device;
                deviceListElement.appendChild(listItem);
            });
        }
    }
});
