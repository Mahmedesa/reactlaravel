<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Product::select('id', 'title', 'description', 'image')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image upload
        $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();
        Storage::disk('public')->putFileAs('images', $request->file('image'), $imageName);

        // Create product
        Product::create($request->except('image') + ['image' => $imageName]);

        return response()->json([
            'message' => "Item added successfully",
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update product details
        $product->update($request->except('image'));

        // Handle image update
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($product->image && Storage::disk('public')->exists("images/{$product->image}")) {
                Storage::disk('public')->delete("images/{$product->image}");
            }

            // Save the new image
            $imageName = Str::random(10) . '.' . $request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('images', $request->file('image'), $imageName);

            $product->update(['image' => $imageName]);
        }

        return response()->json([
            'message' => "Item updated successfully",
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete the image if it exists
        if ($product->image && Storage::disk('public')->exists("images/{$product->image}")) {
            Storage::disk('public')->delete("images/{$product->image}");
        }

        // Delete the product
        $product->delete();

        return response()->json([
            'message' => "Item deleted successfully",
        ]);
    }
}
