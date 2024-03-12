<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->with([
                'items',
                'user' => function ($q) {
                    $q->select('id', 'name', 'phone_number');
                },
            ])->paginate(10); // Adjust the pagination size as needed

        return Inertia::render('Orders/Index', ['orders' => $orders]);
    }

    public function show($id)
    {
        $order = Order::with(['items', 'user'])->findOrFail($id);

        return Inertia::render('Orders/Show', ['order' => $order]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'items.*.name' => 'required|string|max:255',
            'items.*.notes' => 'nullable|string|max:255',
        ]);

        $total = 0;
        $items = collect($request->input('items'));

        // Calculate total
        $items->each(function ($item) use (&$total) {
            $product = Product::find($item['product_id']);
            $total += $product->price * $item['quantity'];
        });

        // Check for minimum order amount
        if ($total < 15) {
            return back()->with(['message' => 'Minimum order amount must be at least 15 EUR']);
        }

        // Begin a transaction
        DB::beginTransaction();

        try {
            $total = 0;
            $items = collect($request->input('items'));

            // Calculate total
            $items->each(function ($item) use (&$total) {
                $product = Product::find($item['product_id']);
                $total += $product->price * $item['quantity'];
            });

            // Check for minimum order amount
            if ($total < 15) {
                // Rollback the transaction
                DB::rollback();
                session()->flash('error', 'Minimum order amount must be at least 15 EUR');
                // Redirect back with error message
                return back()->withErrors(['error' => 'Minimum order amount must be at least 15 EUR']);
            }

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'total' => $total,
            ]);

            $items->each(function ($item) use ($order) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'price' => $item['price'],
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'notes' => $item['notes'] ?? null,
                ]);
            });

            // Commit the transaction
            DB::commit();

            session()->flash('message', 'Order created successfully.');
            // Redirect back with success message
            return redirect()->route('orders.index')->with('message', 'Order created successfully.');
        } catch (\Exception $e) {
            // Rollback the transaction
            DB::rollback();

            session()->flash('error', 'An error occurred while creating the order.');
            // Redirect back with error message
            return back()->withErrors(['error' => 'An error occurred while creating the order.'])->withInput();
        }
    }
}
