import { mount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

describe('TodoItem.vue', () => {
  let wrapper;
  const todoId = "1";
  const todoLabel = 'This is my todo list test';

  beforeEach(() => {
    wrapper = mount(TodoItem, {
      props: {
        id: todoId,
        label: todoLabel,
      }
    });
  });

  it('renders label correctly', () => {
    expect(wrapper.find('.checkbox-label').text()).toBe(todoLabel);
  });

  it('emits checkbox-changed event when checkbox is clicked', async () => {
    await wrapper.find('input[type="checkbox"]').trigger('change');
    expect(wrapper.emitted()).toHaveProperty('checkbox-changed');
  });

  it('toggles to edit form when Edit button is clicked', async () => {
    await wrapper.find('.edit_button').trigger('click');
    expect(wrapper.vm.isEditing).toBe(true);
  });

  it('emits item-deleted event when Delete button is clicked', async () => {
    await wrapper.find('.btn__danger').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('item-deleted');
  });
});
