<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use App\Http\Requests\UploadFileRequest;

class FileController extends Controller
{
    /**
    * Show the form for creating a new resource.
    *
    * @return Response
    */
    public function index()
    {
        $files = File::latest()->get();
        return Inertia::render('Images/FileUpload', compact('files'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store(UploadFileRequest $request)
    {
        $request->validated();

        $fileName = time().'.'.$request->file->extension();

        $request->file->move(public_path('uploads'), $fileName);

        File::create([
            'title' => $request->title,
            'name' => $fileName
        ]);

        return redirect()->route('images.index');
    }
}
