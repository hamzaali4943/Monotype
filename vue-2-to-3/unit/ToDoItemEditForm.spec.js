import { mount } from '@vue/test-utils';
import TodoItemEditForm from '@/components/TodoItemEditForm.vue';

describe('TodoItemEditForm.vue', () => {
  let wrapper;
  const todoId = "1";
  const todoLabel = "Sample Todo";

  beforeEach(() => {
    wrapper = mount(TodoItemEditForm, {
      props: {
        id: todoId,
        label: todoLabel,
      }
    });
  });

  it('renders label correctly in the edit form', () => {
    expect(wrapper.find('.edit-label').text()).toContain(todoLabel);
  });

  it('emits item-edited event when form is submitted with a changed label', async () => {
    const newLabelValue = 'Updated Todo';
    await wrapper.setData({ newLabel: newLabelValue });
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted()).toHaveProperty('item-edited');
    expect(wrapper.emitted().item_edited[0]).toEqual([newLabelValue]);
  });

  it('emits edit-cancelled event when Cancel button is clicked', async () => {
    await wrapper.find('.btn').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('edit-cancelled');
  });

  it('sets focus on input when component is mounted', () => {
    const inputElement = wrapper.find(`input#${sampleId}`);
    expect(document.activeElement).toBe(inputElement.element);
  });
});