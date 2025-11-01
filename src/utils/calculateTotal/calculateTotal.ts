/**
 * Calculates the total sum of numbers from a comma or newline delimited string
 * @param amounts - String containing numbers separated by commas or newlines (e.g., "100, 200, 300")
 * @returns The total sum of all numbers
 */
export function calculateTotal(amounts: string): number {
  if (!amounts || amounts.trim() === "") {
    return 0;
  }

  // Split by both commas and newlines, then filter and parse
  const total = amounts
    .split(/[,\n]+/) // Split by comma or newline
    .map((item) => item.trim()) // Remove whitespace
    .filter((item) => item !== "") // Remove empty strings
    .map((item) => parseFloat(item)) // Convert to numbers
    .filter((num) => !isNaN(num)) // Filter out invalid numbers
    .reduce((sum, num) => sum + num, 0); // Sum all numbers

  return total;
}
