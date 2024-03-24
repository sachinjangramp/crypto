export const ConvertToUnixTimeStamp = (dateString) => {
    // Create a new Date object with the given date string
var date = new Date(dateString);
// Get the Unix timestamp (in seconds)
var timestamp = Math.floor(date.getTime() / 1000);
    return timestamp;
}