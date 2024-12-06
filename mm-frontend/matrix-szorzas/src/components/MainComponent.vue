<script setup>
import { Matrix } from '@/classes/Matrix'
import { ref } from 'vue'

const a_column_b_row_error = ref(false);
const a_matrix_number_change_error = ref(false)
const b_matrix_number_change_error = ref(false)
const a_matrix_row = ref();
const a_matrix_column = ref();
const b_matrix_row = ref();
const b_matrix_column = ref();
const a_matrix = ref(null);
const b_matrix = ref(null);
const multipliedMatrices = ref(null)
const a_matrix_random_numbers = ref(false)
const b_matrix_random_numbers = ref(false)
let a_table_th;
let b_table_th;
const actual_a_matrix_value = ref()
const actual_b_matrix_value = ref()
const actual_a_matrix_value_multiplied_with_b_matrix_value = ref()
const calculations = ref([])


function createNewMatrix(row, column, random) {
  let matrix;
  if (row > 0 && column > 0) {
    matrix = new Matrix(
      parseInt(row),
      parseInt(column)
    );
    if (random) {
      matrix = fillMatrixWithRandomNumbers(matrix);
    }
    matrix = getMatrixData(matrix);
  }
  return matrix
}

function checkIfARowAndbColumnAreEqual(row, column) {
  if (!isNaN(row) && !isNaN(column)) {
    if (row !== column) {
      return true
    }
    else {
      return false
    }
  }
  return false
}

function submitMatrix(id) {
  a_column_b_row_error.value = false;
  a_column_b_row_error.value = checkIfARowAndbColumnAreEqual(b_matrix_row.value, a_matrix_column.value)

  if (!a_column_b_row_error.value) {
    if (id === 1) {
      a_matrix.value = createNewMatrix(a_matrix_row.value, a_matrix_column.value, a_matrix_random_numbers.value)
      a_table_th = a_matrix_column.value;
    }
    else {
      b_matrix.value = createNewMatrix(b_matrix_row.value, b_matrix_column.value, b_matrix_random_numbers.value)
      b_table_th = b_matrix_column.value;
    }
    a_column_b_row_error.value = false;
  }
}

function getMatrixData(matrix) {
  return matrix.getData();
}

function fillMatrixWithRandomNumbers(matrix) {
  return matrix.fillWithRandomNumbers();
}

function* multiplyMatrices() {
  if (a_matrix.value[0].length !== b_matrix.value.length) {
    return null;
  } else {
    let multipliedMatrix = new Matrix(a_matrix.value.length, b_matrix.value[0].length);

    for (let i = 0; i < multipliedMatrix.row; i++) {
      for (let j = 0; j < multipliedMatrix.column; j++) {
        let sum = 0;
        console.log("out")
        for (let k = 0; k < a_matrix.value[0].length; k++) {
          yield
          sum += a_matrix.value[i][k] * b_matrix.value[k][j];
          actual_a_matrix_value.value = a_matrix.value[i][k]
          actual_b_matrix_value.value = b_matrix.value[k][j];
          actual_a_matrix_value_multiplied_with_b_matrix_value.value = a_matrix.value[i][k] * b_matrix.value[k][j];
          calculations.value.push(`${actual_a_matrix_value.value} * ${actual_b_matrix_value.value} = ${actual_a_matrix_value_multiplied_with_b_matrix_value.value}`)
          yield
        }
        calculations.value.push(sum)
        multipliedMatrix.setElement(i, j, sum);
      }
    }
    multipliedMatrix = getMatrixData(multipliedMatrix);
    multipliedMatrices.value = multipliedMatrix
  }
}

let n = multiplyMatrices()
function next() {
  console.log(n.next().value)
  n.next()
}

function changeMatrixNumber(event) {
  event.target.blur()
  a_matrix_number_change_error.value = false
  b_matrix_number_change_error.value = false

  let matrixToUpdate = event.target.classList[0]
  let matrixToUpdateColumn = event.target.cellIndex
  let matrixToUpdateRow = event.target.parentNode.rowIndex
  let changedNumber = event.target.innerText

  if (matrixToUpdate == "a_matrix_td_element" && isNaN(changedNumber)) {
    a_matrix_number_change_error.value = true
    event.target.innerText = a_matrix.value[matrixToUpdateRow - 1][matrixToUpdateColumn - 1]
  }
  else if (matrixToUpdate == "b_matrix_td_element" && isNaN(changedNumber)) {
    b_matrix_number_change_error.value = true
    event.target.innerText = b_matrix.value[matrixToUpdateRow - 1][matrixToUpdateColumn - 1]
  }
  else {
    if (matrixToUpdate == "a_matrix_td_element") {
      a_matrix.value[matrixToUpdateRow - 1][matrixToUpdateColumn - 1] = parseInt(changedNumber)
    }
    else {
      b_matrix.value[matrixToUpdateRow - 1][matrixToUpdateColumn - 1] = parseInt(changedNumber)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-5 text-center">
        <h1>Mátrix szorzó</h1>
      </div>
      <div id="a_matrix_div" class="col-6 mt-5 text-center">
        <h5>"A" mátrix</h5>
        <form data-testid="a_matrix_form_test" @submit.prevent="(submitMatrix(1))">
          <div class="input-group">
            <span class="input-group-text" id="a_matrix_row_number">Mátrix sorainak száma:</span>
            <input data-testid="a_matrix_test_row" id="a_matrix_rows" class="form-control" type="number"
              aria-describedby="a_matrix_row_number" value="1" min="1" v-model="a_matrix_row" />
          </div>
          <div class="input-group">
            <span class="input-group-text" id="a_matrix_column_number">Mátrix oszlopainak száma:</span>
            <input data-testid="a_matrix_test_column" id="a_matrix_columns" class="form-control" type="number"
              aria-describedby="a_matrix_column_number" value="1" min="1" v-model="a_matrix_column" />
          </div>
          <div class="input-group">
            <div class="input-group-text" id="a_matrix_random_numbers">Generálás véletlen számokkal:
              <input data-testid="a_matrix_test_random_numbers" id="a_matrix_random" class="form-check-input mt-0 ms-2"
                type="checkbox" aria-describedby="a_matrix_random_numbers" v-model="a_matrix_random_numbers" />
            </div>
          </div>
          <button class="btn btn-success mt-3 w-50" type="submit">Mehet</button>
        </form>
      </div>
      <div class="col-6 mt-5 text-center">
        <h5>"B" mátrix</h5>
        <form data-testid="b_matrix_form_test" @submit.prevent="(submitMatrix(2))">
          <div class="input-group">
            <span class="input-group-text" id="b_matrix_row_number">Mátrix sorainak száma:</span>
            <input data-testid="b_matrix_test_row" id="b_matrix_rows" class="form-control" type="number"
              aria-describedby="b_matrix_row_number" value="1" min="1" v-model="b_matrix_row" />
          </div>
          <div class="input-group">
            <span class="input-group-text" id="b_matrix_column_number">Mátrix oszlopainak száma:</span>
            <input data-testid="b_matrix_test_column" id="b_matrix_columns" class="form-control" type="number"
              aria-describedby="b_matrix_column_number" value="1" min="1" v-model="b_matrix_column" />
          </div>
          <div class="input-group">
            <div class="input-group-text" id="b_matrix_random_numbers">Generálás véletlen számokkal:
              <input data-testid="b_matrix_test_random_numbers" id="b_matrix_random" class="form-check-input mt-0 ms-2"
                type="checkbox" aria-describedby="b_matrix_random_numbers" v-model="b_matrix_random_numbers" />
            </div>
          </div>
          <button class="btn btn-success mt-3 w-50 go_button">Mehet</button>
        </form>
      </div>
      <div v-if="a_column_b_row_error" class="row mt-5">
        <div class="col-12 text-center">
          <p class="error_message" data-testid="a_column_b_row_error_message" id="matrix_size_error">
            Hiba! Az A mátrix oszlopainak és a B mátrix sorainak száma meg kell, hogy egyezzen!
          </p>
        </div>
      </div>
      <div v-if="a_matrix" class="row mt-5">
        <div class="col-12 text-center">
          <p>A számok módosításához kattintson a módosítandó számra!</p>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6 " v-if="a_matrix">
          <p class="text-start">Az "A" mátrix:</p>
          <p class="error_message" v-if="a_matrix_number_change_error">Csak számot lehet beírni!</p>
          <table class="table table-bordered table-striped-columns">
            <thead>
              <tr>
                <th></th>
                <th v-for="column in a_table_th">
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody data-testid="a_matrix_table">
              <tr v-for="(row, index) in a_matrix" :key="index">
                <td class="rowNumber">{{ index + 1 }}</td>
                <td data-testid="a_matrix_td_element_test" class="a_matrix_td_element" @focusout="changeMatrixNumber"
                  contenteditable="true" v-for="column in row">{{ column }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6" v-if="b_matrix">
          <p class="text-start">A "B" mátrix:</p>
          <p class="error_message" v-if="b_matrix_number_change_error">Csak számot lehet beírni!</p>
          <table class="table table-bordered table-striped-columns">
            <thead>
              <tr>
                <th></th>
                <th v-for="column of b_table_th">
                  {{ column }}
                </th>
              </tr>
            </thead>
            <tbody data-testid="b_matrix_table">
              <tr v-for="(row, index) in b_matrix" :key="index">
                <td class="rowNumber">{{ index + 1 }}</td>
                <td data-testid="b_matrix_td_element_test" class="b_matrix_td_element" @focusout="changeMatrixNumber"
                  contenteditable="true" v-for="column in row">{{ column }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div id="a_matrix_display" class="col-6">
        <!-- Ide fog kirajzolodni a matrix -->
      </div>
      <div id="b_matrix_display" class="col-6">
        <!-- Ide fog kirajzolodni a matrix -->
      </div>
    </div>
    <div class="row text-center">
      <div class="col-12">
        <button type="button" data-testid="multiply_button_test" @click="next"
          class="btn btn-success mt-3">Szorzás!</button>
      </div>
      <div class="col-12 mt-4">
        <p v-if="calculations.length > 0">Szorzások</p>
        <p v-for="(calculation, index) of calculations" :key="index">{{ calculation }}{{ index == 0 ? '+\n' : index == 1 ? '=\n' : index == 2 ? '\n' : index % 2 == 0 ? '+\n' : '' }}</p>
      </div>
      <div v-if="multipliedMatrices" class="col-12 mt-4">
        <p>Az eredmény:</p>
        <table class="table table-bordered table-striped-columns">
          <thead>
            <tr>
              <th></th>
              <th v-for="number of b_matrix_column">
                {{ number }}
              </th>
            </tr>
          </thead>
          <tbody data-testid="multiplied_matrix_tbody_test">
            <tr v-for="(row, index) in multipliedMatrices" :key="index">
              <td class="rowNumber">{{ index + 1 }}</td>
              <td v-for="column in row">
                {{ column }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error_message {
  color: red;
  font-weight: bold;
  border: 2px dotted red;
  text-align: center;
}

.rowNumber {
  font-weight: bold;
}
</style>
