let GoogleAuth; // Declare GoogleAuth instance

// Load the API client and auth2 library
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Initialize the Google API client with your Client ID
function initClient() {
    gapi.client.init({
        apiKey: 'YOUR_API_KEY', 
        clientId: '691057096384-74gruqqkglv1urlp8f96vlfib22asrap.apps.googleusercontent.com', 
        scope: 'https://www.googleapis.com/auth/drive.file',
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();
        document.getElementById('signInBtn').onclick = signIn;
        document.getElementById('uploadBtn').onclick = uploadFile;
    });
}

// Handle sign-in
function signIn() {
    GoogleAuth.signIn().then(function() {
        document.getElementById('fileInput').disabled = false;
        document.getElementById('uploadBtn').disabled = false;
        console.log('User signed in');
    });
}

// Upload file to Google Drive
function uploadFile() {
    const file = document.getElementById('fileInput').files[0];
    if (file) {
        var fileMetadata = {
            'name': file.name
        };
        var media = {
            mimeType: file.type,
            body: file
        };
        var request = gapi.client.drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });
        request.execute(function(response) {
            console.log('File uploaded successfully, ID:', response.id);
        });
    } else {
        alert('No file selected!');
    }
}

// Load the client on page load
window.onload = handleClientLoad;
