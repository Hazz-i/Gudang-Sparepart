<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     */
    public function index()
    {
        return Inertia::render('admin/settings/index');
    }

    /**
     * Update the user's profile information and optionally password.
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $rules = [
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
        ];

        // Only validate password fields if current_password is provided
        if ($request->filled('current_password')) {
            $rules['current_password'] = ['required', 'current_password'];
            $rules['new_password'] = ['required', Password::defaults(), 'confirmed'];
        }

        $validated = $request->validate($rules);

        // Combine first and last name
        $name = trim($validated['first_name'] . ' ' . ($validated['last_name'] ?? ''));

        $updateData = [
            'name' => $name,
            'email' => $validated['email'],
        ];

        // Update password if provided
        if ($request->filled('current_password') && isset($validated['new_password'])) {
            $updateData['password'] = Hash::make($validated['new_password']);
        }

        $user->update($updateData);

        return back()->with('success', 'Pengaturan berhasil disimpan.');
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'new_password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['new_password']),
        ]);

        return back()->with('success', 'Password berhasil diperbarui.');
    }
}
