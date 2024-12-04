export class Matrix {
  constructor(row, column) {
    if (row <= 0 || column <= 0) {
      throw new Error('A mátrix dimenziói nem lehetnek negatívak vagy nulla.')
    }

    if (typeof row !== 'number' || typeof column !== 'number') {
      throw new Error('A mátrix dimenziói csak számok lehetnek.')
    }

    this.row = row
    this.column = column
    this.data = Array.from({ length: row }, () => new Array(column).fill(0))
  }

  fillWithRandomNumbers(min = 1, max = 100) {
    if (typeof min !== 'number' || typeof max !== 'number') {
      throw new Error('A min és max értékeknek számoknak kell lennie.')
    }

    this.data = this.data.map((row) =>
      row.map(() => Math.floor(Math.random() * (max - min + 1)) + min),
    )
    return this
  }

  setElement(rowIndex, columnIndex, value) {
    if (typeof value !== 'number') {
      throw new Error('A hozzáadandó értéknek számnak kell lennie.')
    }

    if (rowIndex < 0 || columnIndex < 0) {
      throw new Error('A sor és oszlop számoknak pozitív számoknak kell lennie.')
    }

    if (rowIndex > this.row || columnIndex > this.column) {
      throw new Error('A sor és oszlop számoknak a mátrix határain belül kell lennie.')
    }

    this.data[rowIndex][columnIndex] = value
    console.log(value, 'hozzáadva a(z)', rowIndex + 1, '. sor ', columnIndex + 1, '. oszlopba.')
    return this
  }

  toString() {
    return this.data.map((row) => row.join(' ')).join('\n')
  }

  getData() {
    return this.data
  }
}
