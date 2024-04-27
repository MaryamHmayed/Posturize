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
        $role = Role::find($user->role_id)->type;
        if ($role !== "physiotherapist" ) {
            return response()->json([
                'error' => true,
                'message' => 'Unauthorized.'
            ], 401);
        
        }
        return $next($request);
    }
}
