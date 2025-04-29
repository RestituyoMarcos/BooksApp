/* eslint-disable @typescript-eslint/no-unused-vars */

const formatDateLocaleString = (date: string) => {
  return new Date(date).toLocaleDateString("es-DO", { year: 'numeric', month: 'short', day: '2-digit' }).replace("de ", "");
};

function parseStringToDate(dateString: string) {
  // Split the date string into day, month, and year
  try {
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format. Use dd/mm/yyyy');
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    // Create a Date object using the components
    // Note: Months in JavaScript are 0-based (0 = January, 1 = February, ...)
    const date = new Date(year, month - 1, day);

    // Check if the Date object is valid
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      throw new Error('Invalid date');
    }

    return date;
  } catch (error) {
    return new Date();
  }
}

export {
  formatDateLocaleString,
  parseStringToDate,
};
