<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // hash password, create user, return token
    // POST /api/register
    public function register(Request $request): JsonResponse
    {
        // validate name/email/password
        $validated = $request->validate([
            'name'      => ['required', 'string', 'max:255'],
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
        ]);
        
        // User::create()
        $user = User::create($validated);

        // createToken('api')
        $token = $user->createToken('api-token')->plainTextToken;
            
        // return token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // verify credentials, return token
    // POST /api/login
    public function login(Request $request): JsonResponse
    {
        // validate name/email/password
        $credentials = $request->validate([
            'email'     => ['required', 'string', 'email', 'max:255'],
            'password'  => ['required'],
        ]);
            
        // attempt auth
            // if fail return 401
        // if (!Auth::attempt($request->only('email', 'password'))) {
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials.'], 401);
        }

        /** @var User $user */
        $user = Auth::user();

        // createToken('api')
        $user->tokens()->delete();
        $token = $user->createToken('api-token')->plainTextToken;

        // return token
        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    // delete token
    // POST /api/logout (auth:sanctum)
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }
}
