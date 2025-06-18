<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TestController;
use App\Http\Controllers\HabitController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/habits',[HabitController::class,'index'])->name('habits.index');

Route::get('/tests', [TestController::class,'new'])->name('test.new');

// Route to create a new habit (POST request)

Route::post('/habits', [HabitController::class, 'store'])->name('habits.store');
// Route to delete a habit (DELETE request)
Route::post('/habits/{id}', [HabitController::class, 'destroy'])->name('habits.destroy');

Route::post('/habits/{id}/commit', [HabitController::class, 'commit'])->name('habits.commit');

// Route to update the goal of a habit (PUT request)
Route::post('/habits/{id}/updateGoal', [HabitController::class, 'updateGoal'])->name('habits.updateGoal');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
