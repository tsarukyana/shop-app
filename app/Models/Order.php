<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Assuming an Order belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
