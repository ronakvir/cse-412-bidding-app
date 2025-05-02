<?php
namespace App\Http\Controllers\Bidding;

use App\Models\BiddingData;
use App\Models\Bid;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;


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
            'bidding' => [
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

    public function deleteAllData() {
        Bid::truncate();
        BiddingData::truncate();
        return redirect()->route('home');
    }

    public function seedTables() {
        if (BiddingData::exists() || Bid::exists()) {
            return back()->withErrors([
                'seed' => 'Please delete all data before you seed.'
            ]);
        }

        $listings = [
            [
                'name'          => 'Vintage Porsche 911',
                'current_price' => 75_000.00,
                'expires_at'    => now()->addDays(2),
                'username'      => 'seller_anne',
            ],
            [
                'name'          => 'MacBook Pro 16”',
                'current_price' => 2_300.00,
                'expires_at'    => now()->addHours(36),
                'username'      => 'tech_guy',
            ],
            [
                'name'          => 'Rolex Submariner',
                'current_price' => 12_500.00,
                'expires_at'    => now()->addHours(12),
                'username'      => 'watch_lover',
            ],
        ];

        foreach ($listings as $data) {
            $listing = BiddingData::create($data);

            $sampleBids = [
                ['username' => 'charlie', 'price' => $listing->current_price * 1.15],
                ['username' => 'bob',     'price' => $listing->current_price * 1.10],
                ['username' => 'alice',   'price' => $listing->current_price * 1.05],
            ];

            foreach ($sampleBids as $b) {
                Bid::create([
                    'bidding_data_id' => $listing->id,
                    'username'        => $b['username'],
                    'price'           => round($b['price'], 2),
                ]);
            }

            $highest = collect($sampleBids)->max('price');
            $listing->update(['current_price' => round($highest, 2)]);
        }

        return redirect()->route('home');
    }
}