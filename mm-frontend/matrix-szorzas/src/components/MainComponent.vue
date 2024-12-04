<script setup>
import { Matrix } from '@/classes/Matrix'
import { ref } from 'vue'

const a_column_b_row_error = ref(false)
const a_matrix_row = ref()
const a_matrix_column = ref()
const b_matrix_row = ref()
const b_matrix_column = ref()
const a_matrix = ref()
const b_matrix = ref()

function createMatrix(matrix_id) {
  a_column_b_row_error.value = false
  if (!isNaN(a_matrix_column.value) && !isNaN(b_matrix_row.value)) {
    if (a_matrix_column.value != b_matrix_row.value) {
      a_column_b_row_error.value = true
    }
  }
  if (a_column_b_row_error.value == false) {
    matrix_id == 1
      ? (a_matrix.value = new Matrix(parseInt(a_matrix_row.value), parseInt(a_matrix_column.value)))
      : (b_matrix.value = new Matrix(parseInt(b_matrix_row.value), parseInt(b_matrix_column.value)))
    matrix_id == 1 ? a_matrix.value = getMatrixData(a_matrix.value) : b_matrix.value = getMatrixData(b_matrix.value)
    a_column_b_row_error.value = false
  }
}

function getMatrixData(matrix) {
  return matrix.getData();
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
        <form data-testid="a_matrix_form_test" @submit.prevent="(createMatrix(1))">
          <div class="input-group">
            <span class="input-group-text" id="a_matrix_row_number">Mátrix sorainak száma:</span>
            <input data-testid="a_matrix_test_row" id="a_matrix_rows" class="form-control" type="number" aria-describedby="a_matrix_row_number"
              value="1" min="1" v-model="a_matrix_row" />
          </div>
          <div class="input-group">
            <span class="input-group-text" id="a_matrix_column_number">Mátrix oszlopainak száma:</span>
            <input data-testid="a_matrix_test_column" id="a_matrix_columns" class="form-control" type="number" aria-describedby="a_matrix_column_number"
              value="1" min="1" v-model="a_matrix_column" />
          </div>
          <button class="btn btn-success mt-3 w-50" type="submit">Mehet</button>
        </form>
        <p class="text-start mt-5">Az "A" mátrix:</p>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody data-testid="a_matrix_table">
            <tr v-for="row in a_matrix">
              <td v-for="column in row">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-6 mt-5 text-center">
        <h5>"B" mátrix</h5>
        <form data-testid="b_matrix_form_test" @submit.prevent="(createMatrix(2))">
          <div class="input-group">
            <span class="input-group-text" id="b_matrix_row_number">Mátrix sorainak száma:</span>
            <input data-testid="b_matrix_test_row" id="b_matrix_rows" class="form-control" type="number" aria-describedby="b_matrix_row_number"
              value="1" min="1" v-model="b_matrix_row" />
          </div>
          <div class="input-group">
            <span class="input-group-text" id="b_matrix_column_number">Mátrix oszlopainak száma:</span>
            <input data-testid="b_matrix_test_column" id="b_matrix_columns" class="form-control" type="number" aria-describedby="b_matrix_column_number"
              value="1" min="1" v-model="b_matrix_column" />
          </div>
          <button class="btn btn-success mt-3 w-50 go_button">Mehet</button>
        </form>
        <p class="text-start mt-5">A "B" mátrix:</p>
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody data-testid="b_matrix_table">
            <tr v-for="row in b_matrix">
              <td v-for="column in row">0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <p data-testid="a_column_b_row_error_message" v-if="a_column_b_row_error" id="matrix_size_error">
          Hiba! Az A mátrix oszlopainak és a B mátrix sorainak száma meg kell, hogy egyezzen!
        </p>
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
        <button class="btn btn-success mt-3">Szorzás!</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
