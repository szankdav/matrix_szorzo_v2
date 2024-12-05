import { vi, describe, it, expect } from 'vitest'
import MainComponent from '../MainComponent.vue'
import { mount } from '@vue/test-utils'

describe('MainComponent functions', () => {
  it('should call submitMatrix when clicked', async () => {
    const wrapper = mount(MainComponent)

    const submitMatrix = vi.spyOn(wrapper.vm, 'submitMatrix')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    expect(submitMatrix).toHaveBeenCalled()
  })

  it('should render a_matrix in the DOM', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')

    await a_matrix_form.trigger('submit')

    const tbodyElement = wrapper.find('tbody')
    const tbodyRows = tbodyElement.element.children.length
    const tbodyColumns = tbodyElement.element.children[0].cells.length
    expect(tbodyRows).toBe(5)
    expect(tbodyColumns).toBe(4)
    expect(wrapper.find('[data-testid="a_matrix_table"]').text()).contains('0')
  })

  it('should render b_matrix in the DOM', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('8')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')

    await b_matrix_form.trigger('submit')

    const tbodyElement = wrapper.find('tbody')
    const tbodyRows = tbodyElement.element.children.length
    const tbodyColumns = tbodyElement.element.children[0].cells.length
    expect(tbodyRows).toBe(8)
    expect(tbodyColumns).toBe(5)
    expect(wrapper.find('[data-testid="b_matrix_table"]').text()).contains('0')
  })

  it('should populate the a_matrix ref with a matrix created by the given dimensions', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    const a_matrix = wrapper.vm.a_matrix
    expect(a_matrix).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  })

  it('should populate the b_matrix ref with a matrix created by the given dimensions', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('2')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const b_matrix = wrapper.vm.b_matrix
    expect(b_matrix).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })

  it('should set a_column_b_row_error ref to true if a_matrix column and b_matrix row is not equal', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')
    const errorAfterAMatrix = wrapper.vm.a_column_b_row_error

    expect(errorAfterAMatrix).toBe(true)
  })

  it('should show error message if a_matrix column and b_matrix row is not equal', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const a_column_b_row_error_error_message = wrapper.find(
      '[data-testid="a_column_b_row_error_message"]',
    )
    expect(a_column_b_row_error_error_message.isVisible()).toBe(true)
  })

  it('should call changeMatrixNumber when a_matrixs td lost focus', async () => {
    const wrapper = mount(MainComponent)
    const changeMatrixNumber = vi.spyOn(wrapper.vm, 'changeMatrixNumber')

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="a_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')

    expect(changeMatrixNumber).toHaveBeenCalled()
  })

  it('should call changeMatrixNumber when b_matrixs td lost focus', async () => {
    const wrapper = mount(MainComponent)
    const changeMatrixNumber = vi.spyOn(wrapper.vm, 'changeMatrixNumber')

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('3')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="b_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')

    expect(changeMatrixNumber).toHaveBeenCalled()
  })

  it('should change the number in the a_matrix', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="a_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')

    const a_matrix = wrapper.vm.a_matrix
    expect(a_matrix).toEqual([
      [5, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  })

  it('should show error message if the given value in a_matrix is not a number', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="a_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = 'd'
    await tdElement.trigger('focusout')

    const a_matrix_number_change_error = wrapper.vm.a_matrix_number_change_error
    expect(a_matrix_number_change_error).toBe(true)
  })

  it('should not change the number in a_matrix if the given value is not a number', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="a_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')

    await tdElement.trigger('focus')
    tdElement.element.innerText = 'd'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')
  })

  it('should change the number in the b_matrix', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="b_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')

    const b_matrix = wrapper.vm.b_matrix
    expect(b_matrix).toEqual([
      [5, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ])
  })

  it('should show error message if the given value in b_matrix is not a number', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="b_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = 'd'
    await tdElement.trigger('focusout')

    const b_matrix_number_change_error = wrapper.vm.b_matrix_number_change_error
    expect(b_matrix_number_change_error).toBe(true)
  })

  it('should not change the number in b_matrix if the given value is not a number', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const tdElement = wrapper.find('[data-testid="b_matrix_td_element_test"]')
    await tdElement.trigger('focus')
    tdElement.element.innerText = '5'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')

    await tdElement.trigger('focus')
    tdElement.element.innerText = 'd'
    await tdElement.trigger('focusout')
    expect(tdElement.text()).toBe('5')
  })

  it('should fill a_matrix with random numbers when checkbox is checked', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const checkbox = wrapper.find('[data-testid="a_matrix_test_random_numbers"]')
    await checkbox.setValue(true)
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')
    const checked = wrapper.vm.a_matrix_random_numbers

    expect(checked).toBe(true)
    const a_matrix = wrapper.vm.a_matrix
    for (const row of a_matrix) {
      for (const column of row) {
        expect(column).toBeGreaterThanOrEqual(1)
        expect(column).toBeLessThanOrEqual(100)
      }
    }
  })

  it('should fill b_matrix with random numbers when checkbox is checked', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('3')
    const checkbox = wrapper.find('[data-testid="b_matrix_test_random_numbers"]')
    await checkbox.setValue(true)
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')
    const checked = wrapper.vm.b_matrix_random_numbers

    expect(checked).toBe(true)
    const b_matrix = wrapper.vm.b_matrix
    for (const row of b_matrix) {
      for (const column of row) {
        expect(column).toBeGreaterThanOrEqual(1)
        expect(column).toBeLessThanOrEqual(100)
      }
    }
  })

  it('should create a multiplied matrix with the correct dimensions', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_checkbox = wrapper.find('[data-testid="a_matrix_test_random_numbers"]')
    await a_matrix_checkbox.setValue(true)
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('3')
    const b_matrix_checkbox = wrapper.find('[data-testid="b_matrix_test_random_numbers"]')
    await b_matrix_checkbox.setValue(true)
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const multiplyButton = wrapper.find('[data-testid="multiply_button_test"]')
    await multiplyButton.trigger('click')
    let multipliedMatrix = wrapper.vm.multipliedMatrices
    expect(multipliedMatrix.length).toBe(5)
    expect(multipliedMatrix[0].length).toBe(3)
  })

  // it('should call multiplyMatrices when button is clicked', async () => {
  //   const wrapper = mount(MainComponent)
  //   const multiply = vi.spyOn(wrapper.vm, 'multiplyMatrices')

  //   await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
  //   await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
  //   const a_matrix_checkbox = wrapper.find('[data-testid="a_matrix_test_random_numbers"]')
  //   await a_matrix_checkbox.setValue(true)
  //   const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
  //   await a_matrix_form.trigger('submit')

  //   await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
  //   await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('3')
  //   const b_matrix_checkbox = wrapper.find('[data-testid="b_matrix_test_random_numbers"]')
  //   await b_matrix_checkbox.setValue(true)
  //   const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
  //   await b_matrix_form.trigger('submit')

  //   const multiplyButton = wrapper.find('[data-testid="multiply_button_test"]')
  //   await multiplyButton.trigger('click')
  //   expect(multiply).toHaveBeenCalled()
  // })

  it('should render the multiplied matrix in the DOM', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_checkbox = wrapper.find('[data-testid="a_matrix_test_random_numbers"]')
    await a_matrix_checkbox.setValue(true)
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('3')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('3')
    const b_matrix_checkbox = wrapper.find('[data-testid="b_matrix_test_random_numbers"]')
    await b_matrix_checkbox.setValue(true)
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')
    await b_matrix_form.trigger('submit')

    const multiplyButton = wrapper.find('[data-testid="multiply_button_test"]')
    await multiplyButton.trigger('click')
    let multipliedMatrix = wrapper.vm.multipliedMatrices
    expect(multipliedMatrix.length).toBe(5)
    expect(multipliedMatrix[0].length).toBe(3)

    const tbodyElementOfMultipliedMatrix = wrapper.find('[data-testid="multiplied_matrix_tbody_test"]')
    const tbodyRowsOfMultipliedMatrix = tbodyElementOfMultipliedMatrix.element.children.length
    const tbodyColumnsOfMultipliedMatrix = tbodyElementOfMultipliedMatrix.element.children[0].cells.length
    expect(tbodyRowsOfMultipliedMatrix).toBe(5)
    expect(tbodyColumnsOfMultipliedMatrix).toBe(4)
    expect(wrapper.find('[data-testid="a_matrix_table"]').text()).contains('0')
  })
})
