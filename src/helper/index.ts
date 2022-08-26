export function findOccuringWords(arr: any[], limit: number) {
  // Create Dictionary to store word
  // and it's frequency
  var hs = {};
  // Iterate through array of words
  arr.forEach((item: any) => {
    const eachTitleArr = item.title.split(' ');
    eachTitleArr.forEach((x) => {
      // If word already exist in Dictionary
      // then increase it's count by 1
      if (hs.hasOwnProperty(x)) {
        hs[x] = hs[x] + 1;
      } else {
        // Otherwise add word to Dictionary
        hs[x] = 1;
      }
    });
  });

  return Object.entries(hs)
    .sort((a: any, b: any) => b[1] - a[1])
    .map((item) => item[0])
    .slice(0, limit);
}
