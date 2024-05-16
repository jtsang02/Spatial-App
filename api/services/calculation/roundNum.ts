function roundNum(number: number, precision: number) {
  return + (Math.round(+(number + 'e' + precision)) + 'e' + -precision);
}

export default roundNum;