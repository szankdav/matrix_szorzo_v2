import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import MainComponent from '../MainComponent.vue'
import { mount } from '@vue/test-utils'

describe('MainComponent functions', () => {
  it('should call createMatrix when clicked', async () => {
    const wrapper = mount(MainComponent)

    const createMatrix = vi.spyOn(wrapper.vm, 'createMatrix')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')
    await a_matrix_form.trigger('submit')

    expect(createMatrix).toHaveBeenCalled()
  })

  it('should render a_matrix in the DOM', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="a_matrix_test_row"]').setValue('5')
    await wrapper.find('[data-testid="a_matrix_test_column"]').setValue('3')
    const a_matrix_form = wrapper.find('[data-testid="a_matrix_form_test"]')

    await a_matrix_form.trigger('submit')

    expect(wrapper.find('[data-testid="a_matrix_test_row"]').element.value).toBe('5')
    expect(wrapper.find('[data-testid="a_matrix_test_column"]').element.value).toBe('3')
    expect(wrapper.find('[data-testid="a_matrix_table"]').text()).contains('0')
  })

  it('should render b_matrix in the DOM', async () => {
    const wrapper = mount(MainComponent)

    await wrapper.find('[data-testid="b_matrix_test_row"]').setValue('8')
    await wrapper.find('[data-testid="b_matrix_test_column"]').setValue('4')
    const b_matrix_form = wrapper.find('[data-testid="b_matrix_form_test"]')

    await b_matrix_form.trigger('submit')

    expect(wrapper.find('[data-testid="b_matrix_test_row"]').element.value).toBe('8')
    expect(wrapper.find('[data-testid="b_matrix_test_column"]').element.value).toBe('4')
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

  it('should not change the number in a_matrix on the given position if the given value is not a number', async () => {
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

  it('should not change the number in b_matrix on the given position if the given value is not a number', async () => {
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
})
