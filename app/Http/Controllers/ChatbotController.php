<?php

namespace App\Http\Controllers;

use App\Services\GeminiChatbotService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotController extends Controller
{
    public function index()
    {
        return Inertia::render('Chatbot', [
            'chatbotRoute' => route('chatbot.ask'),
        ]);
    }

    public function ask(Request $request, GeminiChatbotService $gemini)
    {
        $request->validate([
            'question' => 'required|string|max:500',
        ]);

        $question = $request->input('question');
        $answer = $gemini->generateResponse($question);

        return response()->json([
            'question' => $question,
            'answer' => $answer ?? 'Maaf, saya tidak dapat menemukan jawaban untuk pertanyaan tersebut.',
        ]);
    }
}
