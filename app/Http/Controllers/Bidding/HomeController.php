<?php

namespace App\Http\Controllers\Bidding;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\BiddingData;
use Illuminate\Support\Carbon;

class HomeController extends Controller
{
    /**
     * Get current active bids
     */
    public function create(Request $request): Response
    {
        $bidding_data = BiddingData::where('expires_at', '>', Carbon::now())
        ->get()
        ->map(function ($bid) {
            return [
                'id' => $bid->id,
                'name' => $bid->name,
                'currentPrice' => $bid->current_price,
                'expiresAt' => $bid->expires_at,
                'username' => $bid->username,
            ];
        });

        return Inertia::render('bidding/home', [
            'activeBiddings' => $bidding_data
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
