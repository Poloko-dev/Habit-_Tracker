<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    function new(){
        return Inertia::render('Tests/NewTest');
    }
}
