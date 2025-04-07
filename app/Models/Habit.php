<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Habit extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if your table name is pluralized as per convention)
    protected $table = 'habits';

    // If you're using fillable fields (to prevent mass assignment vulnerability)
    protected $fillable = [
        'name',
        'current',
        'goal',
    ];

    // If you want to cast certain fields (like current/goal) to an integer
    protected $casts = [
        'current' => 'integer',
        'goal' => 'integer',
    ];

}
