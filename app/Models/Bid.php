<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    protected $table = 'bids';

    protected $fillable = [
        'bidding_data_id',
        'username',
        'price',
    ];

    public function biddingData() {
        return $this->belongsTo(BiddingData::class, 'bidding_data_id', 'id');
    }
    
}
