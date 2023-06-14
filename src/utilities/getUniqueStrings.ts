const getUniqueStrings = (inputArray: string[]): string[] => {
  const uniqueStrings: string[] = []

  // Convert all strings to lowercase for case-insensitive comparison
  const lowerCaseStrings = inputArray.map((str) => str.toLowerCase())

  // Iterate through each string in the input array
  for (const str of lowerCaseStrings) {
    // Check if the lowercase version of the string is already in the uniqueStrings array
    if (!uniqueStrings.includes(str)) {
      // Add the original string (not the lowercase version) to the uniqueStrings array
      uniqueStrings.push(inputArray[lowerCaseStrings.indexOf(str)])
    }
  }

  return uniqueStrings
}

export default getUniqueStrings
