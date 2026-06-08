<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

// should maybe check that project_id isnt a project_id from a different user
#[Fillable(['title', 'description', 'finished'])]
class Task extends Model
{
    public function getUser()
    {
        return $this->belongsTo(User::class);
    }
}
