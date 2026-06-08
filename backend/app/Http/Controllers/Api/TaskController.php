<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private function authorizeProject(Project $project, Request $request)
    {
        if ($project->user_id !== $request->user()->id) {
            abort(403);
        }
    }

    public function index(Request $request, Project $project)
    {
        $this->authorizeProject($project, $request);

        return $project->tasks()->get();
    }

    public function store(Request $request, Project $project)
    {
        $this->authorizeProject($project, $request);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'finished' => 'boolean',
        ]);

        $task = $project->tasks()->create($validated);

        return response()->json($task, 201);
    }

    public function show(Request $request, Project $project, Task $task)
    {
        $this->authorizeProject($project, $request);

        return $task;
    }

    public function update(Request $request, Project $project, Task $task)
    {
        $this->authorizeProject($project, $request);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'finished' => 'boolean',
        ]);

        $task->update($validated);

        return $task;
    }

    public function destroy(Request $request, Project $project, Task $task)
    {
        $this->authorizeProject($project, $request);

        $task->delete();

        return response()->json(null, 204);
    }
}
