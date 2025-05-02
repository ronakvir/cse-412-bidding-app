<?php

namespace App\Http\Controllers\Bidding;

use App\Http\Controllers\Controller;
use App\Models\BiddingData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class CreateBidController extends Controller
{
    public function go(): Response
    {
        return Inertia::render('bidding/createbid');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'currentPrice' => 'required|numeric|min:0',
            'expiresAt' => 'required|date|after:now',
            'username' => 'required|string|max:255',
        ]);
    
        BiddingData::create([
            'name' => $validated['name'],
            'current_price' => $validated['currentPrice'],
            'expires_at' => $validated['expiresAt'],
            'username' => $validated['username'],
        ]);
    
        return redirect()->route('home');
    }
    
}
