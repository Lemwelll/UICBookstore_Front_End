// It will be available as useFoo() (camelCase of file name without extension)
export default function () {
  function validEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || "Invalid email address";
  }

  function minPasswordLength(password: string) {
    return (
      (password && password.length >= 8) ||
      "Password must be at least 8 characters"
    );
  }

  function requiredInput(input: string) {
    return !!input || "Required";
  }

  function formatNumberIntoString(value: number) {
    return value.toLocaleString("en-US", { minimumFractionDigits: 2 });
  }

  function calculateDateRange(
    startDate: string | number | Date,
    months: number,
  ) {
    startDate = new Date(startDate);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + months,
      startDate.getDate(),
    );

    // Format the dates for output
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });

    const startDateString =
      startMonth + " " + startDate.getDate() + ", " + startDate.getFullYear();
    const endDateString =
      endMonth + " " + endDate.getDate() + ", " + endDate.getFullYear();

    return {
      formatted: "Start " + startDateString + " - Ends " + endDateString,
      raw: {
        start: startDate,
        end: endDate,
      },
    };
  }

  return {
    validEmail,
    minPasswordLength,
    requiredInput,
    formatNumberIntoString,
    calculateDateRange,
  };
}
