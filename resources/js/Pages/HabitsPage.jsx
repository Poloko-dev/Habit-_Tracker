import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Dashboard({ habits }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        current: 0,
        goal: 0,
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!data.name || data.name.trim() === '') {
            console.error('The name field is required.');
            return;
        }
        if (data.goal < 1) {
            console.error('The goal field must be at least 1.');
            return;
        }

        // Send POST request to the backend to store the habit
        post(route('habits.store'), {
            onSuccess: () => {
                // Reset form after success
                setData({
                    name: '',
                    current: 0,
                    goal: 0,
                });
            },
            onError: (errors) => {
                console.error(errors);  // Handle errors from backend if needed
            },
        });
    };

    // Function to calculate progress percentage
    const getProgressPercentage = () => {
        if (data.goal === 0) return 0;
        return Math.min((data.current / data.goal) * 100, 100);
    };

    // Function to determine the color based on progress
    const getProgressColor = () => {
        const percentage = getProgressPercentage();
        if (percentage >= 80) return 'bg-green-500'; // Green if 80% or more
        if (percentage >= 40) return 'bg-yellow-500'; // Yellow if between 40% and 80%
        return 'bg-red-500'; // Red if less than 40%
    };

    const handleCommit = (habitId) => {
        // Increment current progress by 1
        post(route('habits.commit', habitId), {
            onSuccess: () => {
                // You may need to refetch habits or update the local state here
                console.log("Progress committed successfully");
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
    };
    
    const handleEditGoal = (habitId) => {
        // Prompt user for a new goal
        const newGoal = prompt("Enter new goal:");
    
        // Convert the input to a number and ensure it is a valid positive number
        const goalNumber = parseInt(newGoal, 10);
    
        if (newGoal && !isNaN(goalNumber) && goalNumber > 0) {
            // Only set the goal field to the new value from the prompt
            setData({
                name: data.name,   // Retain the current name value
                current: data.current, // Retain the current progress value
                goal: goalNumber,  // Set the new goal value
            });
    
            // Send the updated goal to the backend
            post(route('habits.updateGoal', habitId), {
                goal: goalNumber,  // Send the updated goal value to the backend
                onSuccess: () => {
                    console.log("Goal updated successfully");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        } else {
            alert("Please enter a valid goal.");
        }
    };
    
    
    
    
    const handleDelete = (habitId) => {
        if (confirm("Are you sure you want to delete this habit?")) {
            post(route('habits.destroy', habitId), {
                onSuccess: () => {
                    console.log("Habit deleted successfully");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 italic">
                    HABITIFY
                </h2>
            }
        >
            <Head title="Habits" />

            <div className="py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-xl p-8 md:p-16">
                        <div className="text-center">
                            {/* Habit Form */}
                            
                            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Habit Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="current" className="block text-sm font-medium text-gray-700">
                                        Current Progress
                                    </label>
                                    <input
                                        type="number"
                                        id="current"
                                        name="current"
                                        value={data.current}
                                        onChange={(e) => setData('current', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.current && <div className="text-red-500 text-xs">{errors.current}</div>}
                                </div>

                                <div>
                                    <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
                                        Goal
                                    </label>
                                    <input
                                        type="number"
                                        id="goal"
                                        name="goal"
                                        value={data.goal}
                                        onChange={(e) => setData('goal', parseInt(e.target.value) || 0)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.goal && <div className="text-red-500 text-xs">{errors.goal}</div>}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {processing ? 'Adding...' : 'Add Habit'}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                            {/* Habit Table */}
                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900">Habits</h3>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b text-left">Habit Name</th>
                                            <th className="px-6 py-3 border-b text-left">Current Progress</th>
                                            <th className="px-6 py-3 border-b text-left">Goal</th>
                                            <th className="px-6 py-3 border-b text-left">Progress</th>
                                            <th className="px-6 py-3 border-b text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(Array.isArray(habits) && habits.length > 0) ? (
                                            habits.map((habit) => (
                                                <tr key={habit.id}>
                                                    <td className="px-6 py-4 border-b">{habit.name}</td>
                                                    <td className="px-6 py-4 border-b">{habit.current}</td>
                                                    <td className="px-6 py-4 border-b">{habit.goal}</td>
                                                    <td className="px-6 py-4 border-b">
                                                        <div className="relative pt-1">
                                                            <div className="flex mb-2 items-center justify-between">
                                                                <div>
                                                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-800">
                                                                        {habit.name}
                                                                    </span>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600">
                                                                        {Math.round((habit.current / habit.goal) * 100)}% Completed
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex mb-2">
                                                                <div
                                                                    className={`w-full bg-gray-200 h-2.5 rounded-full ${
                                                                        habit.current >= habit.goal
                                                                            ? 'bg-green-500'
                                                                            : habit.current >= habit.goal / 2
                                                                            ? 'bg-yellow-500'
                                                                            : 'bg-red-500'
                                                                    }`}
                                                                    style={ {
                                                                        width: `${Math.min((habit.current / habit.goal) * 100, 100)}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 border-b">
                                                        <div className="flex space-x-2">
                                                            {/* Commit Button */}
                                                            <button
                                                                onClick={() => handleCommit(habit.id)}
                                                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                                                            >
                                                                Commit
                                                            </button>

                                                            {/* Edit Button */}
                                                            <button
                                                                onClick={() => handleEditGoal(habit.id)}
                                                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
                                                            >
                                                                Edit Goal
                                                            </button>

                                                            {/* Delete Button */}
                                                            <button
                                                                onClick={() => handleDelete(habit.id)}
                                                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4">No habits found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
