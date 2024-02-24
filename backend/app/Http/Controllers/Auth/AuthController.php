<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\verificationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use PhpParser\Node\Stmt\TryCatch;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where(['email' => $request->email])->first();

        if ($user && Hash::check($request->password, $user->password)) {

            $token = $user->createToken('AuthToken')->plainTextToken;
            return response()->json(['token' => $token, 'id' => $user->id]);
        }

        return response()->json(['message' => 'User not authenticated'], 401);
    }

    //! -- traitement for Sign Up
    public function sign_up(Request $request)
    {
        $user = User::where(['email' => $request->email])->first();

        if (!$user) {
            $code = rand(100000, 999999);
            Mail::to($request->email)->send(new verificationMail($code));
            return response()->json(['code' => $code]);
        }

        return response()->json(['message' => 'Email already exist'], 400);
    }

    public function sign_up_v2(Request $request)
    {
        $user = new User();
        $user->name = $request->data['name'];
        $user->email = $request->data['email'];
        $user->password = $request->data['password'];
        $user->role = $request->role;
        $user->save();
        return response()->json(['message' => 'User created sucssufully']);
    }

    //! -- traitement for reset password
    public function checkEmailIfExist(Request $request)
    {
        if (User::where(['email' => $request->email])->first()) {
            $code = rand(100000, 999999);
            Mail::to($request->email)->send(new verificationMail($code));
            return response()->json(['code' => $code]);
        }
        return response()->json(['message' => 'User not authenticated'], 401);
    }
    public function updatePassword(Request $request)
    {
        if ($user = User::where(['email' => $request->email])->first()) {
            $user->password = $request->password;
            $user->update();
            return response()->json('Password Updated sucssufuly');
        }
        return response()->json(['message' => 'User not authenticated'], 401);
    }

    public function logout(Request $request)
    {
        $user = User::find($request->id);

        if ($user) {
            $user->tokens()->delete();
            return response()->json(['message' => 'Tokens revoked successfully']);
        }
        return response()->json(['message' => 'User not authenticated'], 401);
    }
}
