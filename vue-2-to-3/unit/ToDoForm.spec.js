import { mount } from '@vue/test-utils';
import TodoForm from '@/components/TodoForm.vue';

describe('TodoInput.vue', () => {
  it('emits the input value when form is submitted', async () => {
    const wrapper = mount(TodoForm);
    const input = wrapper.find('#new-todo-input');
    const testValue = 'Sample todo';

    await input.setValue(testValue);
    await wrapper.trigger('submit.prevent');

    expect(wrapper.emitted()).toHaveProperty('todo-added');
    expect(wrapper.emitted('todo-added')[0]).toEqual([testValue]);
  });

  it('does not emit an event when input is empty', async () => {
    const wrapper = mount(TodoForm);

    await wrapper.trigger('submit.prevent');

    expect(wrapper.emitted('todo-added')).toBeFalsy();
  });
});