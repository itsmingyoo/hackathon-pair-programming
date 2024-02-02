// Your JavaScript Code Here
  function add(a, b) {
    return a + b + 10
  }
if (require.main === module) {
    const a = parseInt(process.argv[2]);
    const b = parseInt(process.argv[3]);
    const expectedResult = parseInt(process.argv[4]);
    console.log(add(a, b) === expectedResult);
}
