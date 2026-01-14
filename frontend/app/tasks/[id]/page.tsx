'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/src/lib/api';
import AppShell from '@/src/components/AppShell';
import { useToast } from '@/src/context/toast';
import { Task } from '@/shared/types';

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Task>>({});

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await apiClient.getTaskById(id as string);
      if (response.success && response.data) {
        setTask(response.data);
        setEditData(response.data);
      } else {
        addToast(response.error || 'Failed to load task', 'error');
      }
    } catch (err) {
      addToast('An error occurred while fetching the task', 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async () => {
    if (!task || !id) return;

    try {
      const response = await apiClient.updateTask(id as string, editData);
      if (response.success) {
        setTask({ ...task, ...editData } as Task);
        setIsEditing(false);
        addToast('Task updated successfully', 'success');
      } else {
        addToast(response.error || 'Failed to update task', 'error');
      }
    } catch (err) {
      addToast('An error occurred while updating the task', 'error');
      console.error(err);
    }
  };

  const handleDeleteTask = async () => {
    if (!id || !confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await apiClient.deleteTask(id as string);
      if (response.success) {
        addToast('Task deleted successfully', 'success');
        router.push('/tasks');
      } else {
        addToast(response.error || 'Failed to delete task', 'error');
      }
    } catch (err) {
      addToast('An error occurred while deleting the task', 'error');
      console.error(err);
    }
  };

  const toggleTaskStatus = async () => {
    if (!task) return;

    const newStatus = task.status === 'active' ? 'completed' : 'active';
    setEditData({ ...editData, status: newStatus });
    setTask({ ...task, status: newStatus } as Task);

    // Update on the server
    try {
      const response = await apiClient.updateTask(id as string, { status: newStatus });
      if (!response.success) {
        // Revert if update failed
        setTask(task);
        addToast(response.error || 'Failed to update task status', 'error');
      } else {
        addToast(`Task marked as ${newStatus}`, 'success');
      }
    } catch (err) {
      // Revert if update failed
      setTask(task);
      addToast('An error occurred while updating task status', 'error');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Task not found</div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <button
              onClick={() => router.push('/tasks')}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Tasks
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Task Details</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={toggleTaskStatus}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      task.status === 'active'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {task.status === 'active' ? 'Mark Complete' : 'Mark Active'}
                  </button>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    onClick={handleDeleteTask}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={editData.title || ''}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        id="priority"
                        value={editData.priority || task.priority}
                        onChange={(e) => setEditData({ ...editData, priority: e.target.value as any })}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        value={editData.dueDate ? new Date(editData.dueDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                        className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      value={editData.category || ''}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateTask}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h2 className={`text-2xl font-bold ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h2>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1 text-gray-900">
                      {task.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                      <div className="mt-1">
                        {task.priority === 'urgent' && (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                            Urgent
                          </span>
                        )}
                        {task.priority === 'high' && (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            High
                          </span>
                        )}
                        {task.priority === 'medium' && (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                            Medium
                          </span>
                        )}
                        {task.priority === 'low' && (
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Low
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Status</h3>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                          task.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                      <p className="mt-1 text-gray-900">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Category</h3>
                      <p className="mt-1 text-gray-900">
                        {task.category || 'Uncategorized'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created</h3>
                    <p className="mt-1 text-gray-900">
                      {new Date(task.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                    <p className="mt-1 text-gray-900">
                      {new Date(task.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}