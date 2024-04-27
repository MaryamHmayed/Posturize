<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;

class PhysiotherapistMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        // Check if there is an authenticated user
        if (!$user) {
            // If not authenticated, return an unauthorized response
            return response()->json([
                'error' => true,
                'message' => 'Unauthorized.'
            ], 401);
        }
    
        // Check if the authenticated user is a physiotherapist
        $role = Role::find($user->role_id);
    
        if (!$role || $role->type !== "physiotherapist") {
            // If not a physiotherapist or role not found, return an unauthorized response
            return response()->json([
                'error' => true,
                'message' => 'Unauthorized.'
            ], 401);
        }
    
        // If the user is authenticated and is a physiotherapist, allow the request to continue
        return $next($request);
    }
}
