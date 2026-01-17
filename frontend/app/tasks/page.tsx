'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/src/lib/api';
import Link from 'next/link';
import AppShell from '@/src/components/AppShell';
import { useToast } from '@/src/context/toast';
import { Task } from '@/shared/types';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, priorityFilter, search]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params: any = {
        status: statusFilter === 'all' ? undefined : statusFilter,
        priority: priorityFilter === 'all' ? undefined : priorityFilter,
        search: search || undefined,
      };

      const response = await apiClient.getTasks(params);
      if (response.success) {
        // The API returns tasks directly, not in a paginated wrapper
        setTasks(Array.isArray(response.data) ? response.data : []);
      } else {
        addToast(response.error || 'Failed to load tasks', 'error');
      }
    } catch (err) {
      addToast('An error occurred while fetching tasks', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      const updatedTask: Task = {
        ...task,
        status: task.status === 'active' ? 'completed' : 'active'
      };
      const response = await apiClient.updateTask(task.id, updatedTask);

      if (response.success) {
        setTasks(tasks.map(t => t.id === task.id ? { ...t, status: updatedTask.status } : t));
        addToast(`Task marked as ${updatedTask.status}`, 'success');
      } else {
        addToast('Failed to update task status', 'error');
      }
    } catch (err) {
      addToast('Error updating task', 'error');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await apiClient.deleteTask(id);
        if (response.success) {
          setTasks(tasks.filter(task => task.id !== id));
          addToast('Task deleted successfully', 'success');
        } else {
          addToast('Failed to delete task', 'error');
        }
      } catch (err) {
        addToast('Error deleting task', 'error');
        console.error('Error deleting task:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <Link href="/tasks/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Create Task
              </Link>
            </div>
          </div>


          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'completed')}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Task List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {tasks.length === 0 ? (
                <li className="px-6 py-12 text-center">
                  <div className="text-gray-500">No tasks found</div>
                  <Link href="/tasks/new" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block">
                    Create Your First Task
                  </Link>
                </li>
              ) : (
                tasks.map((task) => (
                  <li key={task.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={() => toggleTaskStatus(task)}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div className="ml-3 flex items-center">
                            <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                              {task.title}
                            </p>
                            {task.priority === 'urgent' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                Urgent
                              </span>
                            )}
                            {task.priority === 'high' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                High
                              </span>
                            )}
                            {task.priority === 'medium' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Medium
                              </span>
                            )}
                            {task.priority === 'low' && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Low
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          {task.dueDate && (
                            <span className="text-sm text-gray-500 mr-4">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <div className="mt-2 ml-7 text-sm text-gray-500">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}