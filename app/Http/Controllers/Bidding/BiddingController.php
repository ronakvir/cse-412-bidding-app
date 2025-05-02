<?php
namespace App\Http\Controllers\Bidding;

use App\Models\BiddingData;
use App\Models\Bid;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class BiddingController extends Controller {

    public function show($id) {
        $listing = BiddingData::findOrFail($id);

        $bids = $listing
            ->bids()
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($bid) => [
                'username'  => $bid->username,
                'price'     => $bid->price,
                'createdAt' => $bid->created_at->diffForHumans(),
            ]);

        return Inertia::render('bidding/listing', [
            'listing' => [
                'id' => $listing->id,
                'name' => $listing->name,
                'currentPrice' => $listing->current_price,
                'expiresAt' => $listing->expires_at,
                'username' => $listing->username,
            ],
            'bids' => $bids
        ]);
    }

    public function placeBid(Request $request, $id) {
        $request->validate([
            'username' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $listing = BiddingData::findOrFail($id);

        if ($request->price <= $listing->current_price) {
            return back()
                ->withErrors(['price' => 'Your bid must exceed the current price.'])
                ->withInput();
        }

        Bid::create([
            'bidding_data_id' => $listing->id,
            'username' => $request->username,
            'price' => $request->price,
        ]);

        $listing->update(['current_price' => $request->price]);

        return redirect()->route('listing.show', $id);
    }
}