<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BiddingData extends Model
{
    protected $table = 'bidding_data';

    protected $fillable = [
        'name',
        'current_price',
        'expires_at',
        'username',
    ];
}
