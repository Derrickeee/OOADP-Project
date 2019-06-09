const moment = require('moment');
module.exports = {
    generateHTMLforLoop: function (ratings) {
        let myString = '';
        for (let i = 0; i < ratings; i++) {
          myString   += '<img src="/img/star-on.svg" width="35">'
        }
       
        return myString;
    },

    formatDate: function (date, targetFormat) {
        return moment(date).format(targetFormat);
    },

    radioCheck: function (value, radioValue) {
        // Write your codes here
        if (value === radioValue) {
            return "checked";
        } else {
            return "";
        }
    },

    // Practical 08 Exercise 01 - ReplaceCommas
    replaceCommas: function (value) {
        // TODO: Replace all Commas characters with the <space><pipe><space> ' | ' characters
        // TODO: If  the string is empty, return "none" for display
        var result = "None";
        if (value !== null && value !== "") {
            var regex = /,/g;
            result = value.replace(regex, " | ");
        }
        return result;
    }
};