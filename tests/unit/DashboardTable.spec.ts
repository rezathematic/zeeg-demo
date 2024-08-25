import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DashboardTable from '~/components/DashboardTable.vue';

describe('DashboardTable.vue', () => {
  it('renders the correct number of rows based on events', () => {
    const wrapper = mount(DashboardTable);
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(2); // Since we have 2 events in the initial data
  });

  it('renders the correct data for each event', () => {
    const wrapper = mount(DashboardTable);
    const rows = wrapper.findAll('tbody tr');

    expect(rows[0].find('td:nth-child(1)').text()).toBe('John Doe');
    expect(rows[0].find('td:nth-child(2)').text()).toBe('john@example.com');
    expect(rows[0].find('td:nth-child(3)').text()).toBe('2024-08-25');
    expect(rows[0].find('td:nth-child(4)').text()).toBe('10:00 AM');

    expect(rows[1].find('td:nth-child(1)').text()).toBe('Jane Smith');
    expect(rows[1].find('td:nth-child(2)').text()).toBe('jane@example.com');
    expect(rows[1].find('td:nth-child(3)').text()).toBe('2024-08-26');
    expect(rows[1].find('td:nth-child(4)').text()).toBe('2:00 PM');
  });

  it('updates the table when events data changes', async () => {
    const wrapper = mount(DashboardTable);

    // Add a new event to the events array
    await wrapper.vm.events.push({
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      date: '2024-08-27',
      time: '9:00 AM',
    });

    // Wait for the DOM to update
    await wrapper.vm.$nextTick();

    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(3); // Should now have 3 rows

    expect(rows[2].find('td:nth-child(1)').text()).toBe('Alice Johnson');
    expect(rows[2].find('td:nth-child(2)').text()).toBe('alice@example.com');
    expect(rows[2].find('td:nth-child(3)').text()).toBe('2024-08-27');
    expect(rows[2].find('td:nth-child(4)').text()).toBe('9:00 AM');
  });
});
