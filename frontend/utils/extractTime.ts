export function extractTime(dateString: any) {
  // Create a Date object from the UTC string
  const date = new Date(dateString);

  // Get the hours (0-23), minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to 12-hour format (with AM/PM)
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 and handle remaining hours

  // Format the time string with leading zeros for minutes
  const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${amPm}`;

  return formattedTime;
}
