<?php

namespace App\Http\Controllers;

use App\Models\Habit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HabitController extends Controller
{
    // Display the list of habits
    public function index()
    {
        $habits = Habit::all();
        return Inertia::render('HabitsPage', [
            'habits' => $habits
        ]);
    }

    // Store a new habit (capture a habit)
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'current' => 'required|integer|min:0',
            'goal' => 'required|integer|min:1',
        ]);

        // Create a new habit
        $habit = Habit::create([
            'name' => $request->name,
            'current' => $request->current,
            'goal' => $request->goal,
        ]);

        return back()->with('message', 'Habit created successfully');
    }

    // Delete a habit
    public function destroy($id)
    {
        // Find the habit by ID
        $habit = Habit::find($id);

        if (!$habit) {
            return back()->with('message', 'Habit deleted successfully');
        }

        // Delete the habit
        $habit->delete();

        return back()->with('message', 'Habit deleted successfully');
    }

    // Edit a habit (update the goal)
    public function updateGoal($id, Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'goal' => 'required|integer|min:1',
        ]);

        // Find the habit by ID
        $habit = Habit::find($id);
        
        if (!$habit) {
            return response()->json([
                'message' => 'Habit not found'
            ], 404);
        }
        // Update the goal of the habit
        $habit->goal = $request->goal;
        $habit->save();

        return back()->with('message', 'Habit goal updated successfully');
    }


    // Increment the current progress by 1
    public function commit($id)
    {
        // Find the habit by ID
        $habit = Habit::find($id);

        if (!$habit) {
            return response()->json([
                'message' => 'Habit not found'
            ], 404);
        }

        // Increment the current progress by 1 (ensure it does not exceed the goal)
        $habit->current = min($habit->current + 1, $habit->goal);
        $habit->save();

        return back()->with('message', 'Habit progress updated successfully');
    }
}
