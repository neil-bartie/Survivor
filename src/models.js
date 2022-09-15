function transformData({ binField, binBoundaries, data }) {

  const survived = data.filter(({ Survived }) => Survived) //Would give false positive if Survived is of type String

  const binCount = binBoundaries.length + 1

  const counts = new Array(binCount).fill(0)

  survived.forEach(item => {
    const value = item[binField]

    if (value == null) {
      return
    }

    for (let i = 0; i < binCount; i++) {

      if (value < binBoundaries[i]) {
        counts[i]++
        break;
      }
      if (i === binCount - 1) {
        counts[i]++
      }
    }
  })

  return {
    counts
  }
}


module.exports = exports = {
  transformData
}