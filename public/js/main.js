// TODO: Parameters for the function to check, CheckBox Name, Submit Button ID, Language Error Message ID
function ensureCheck(checkboxName, messageID, submitBtnID) {

    // TODO: Get the Language Checkboxes by Name
    var checkboxes = document.getElementsByName(checkboxName);
    // TODO: Get the Error Message Element by ID
    var errorMessage = document.getElementById(messageID);
    // TODO: Get the Save Button Element by ID
    var saveButton = document.getElementById(submitBtnID);

    // TODO: Loop through the checkboxes to ensure at least 1 checkbox is ticked
    var atLeastOneChecked = false;
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            atLeastOneChecked = true;
            break;
        }
    }

    // TODO: If more than 1 is ticked, 
    if (atLeastOneChecked) {
        //  1) Hide the Error Message
        errorMessage.style.display = 'none'
        //  2) Enable the Save button
        saveButton.disabled = false;
    } else {
        // TODO: If no Checkbox is ticked,
        //  1) Show the Error Message
        errorMessage.style.display = 'block';
        //  2) Disable the Save button
        saveButton.disabled = true;
    }
}

function getOMdbMovie() {  // Practical 09 Activity 02
    const title = document.getElementById('title').value;
    const poster = document.getElementById('poster');
    const omdbErr = document.getElementById('OMdbErr');
    const posterURL = document.getElementById('posterURL');
    const starring = document.getElementById('starring');
    const story = document.getElementById('story');
    const datepicker = document.getElementById('datepicker');
    fetch('https://www.omdbapi.com/?t=' + title + '&apikey=ff5f8fe0')
        .then((res) => {
            return res.json();
        }).then((data) => {
            if (data.Response === 'False') {
                poster.src = '/img/no-image.jpg';
                omdbErr.style.display = 'inline';
            } else {
                omdbErr.style.display = 'none';
                poster.src = data.Poster;
                starring.value = data.Actors;
                posterURL.value = data.Poster; // hidden input field to submit
                story.value = data.Plot;
                datepicker.value = moment(new
                    Date(data.Released)).format('DD/MM/YYYY');
            }
        }).catch(error => { omdbErr.innerHTML = error; })
}

function ProperCase(elementName) {
    var element = document.getElementById(elementName);
    var title = element.value;
    var stringBuilder = "";
    var array = title.split(" ");
    for (let i = 0; i < array.length; i++) {
        var token = array[i];
        if (stringBuilder.length > 0) {
            stringBuilder +=  " ";
        }
        stringBuilder += token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
    }
    if (stringBuilder.length > 0) {
        result = stringBuilder;
        element.value = result;
    }
}