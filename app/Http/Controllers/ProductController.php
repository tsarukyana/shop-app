<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->paginate(10); // Adjust the pagination size as needed

        return Inertia::render('Products/Index', ['products' => $products]);
    }
}

