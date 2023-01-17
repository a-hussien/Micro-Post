import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import Dropzone from 'react-dropzone';

export default function FileUpload(props) {
    const { files } = usePage().props

    const { data, setData, errors, post, progress } = useForm({
        title: "",
        file: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("images.store"));

        setData("title", "")
        setData("file", null)
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Images</h2>}
        >
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Title"
                                            name="title"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.title}
                                        </span>
                                    </div>
                                    <div className="mb-0">
                                    <Dropzone
                                        accept={{'image/*': ['.png', '.jpg']}}
                                        multiple={true}
                                        maxFiles={1}
                                        onDropAccepted={acceptedFiles => setData('file', acceptedFiles[0])}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <section className='flex flex-1 flex-col items-center place-content-center px-6 py-8 border-2 border-dashed border-slate-400 bg-slate-200 rounded-md cursor-pointer'>
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <p className='text-slate-500 font-semibold'>Drag and drop some files here, or click to select files</p>
                                                </div>
                                                <p className="text-red-600">
                                                    {errors.file}
                                                </p>
                                            </section>

                                        )}
                                    </Dropzone>
                                    </div>
                                </div>

                                {progress && (
                                  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                    <div className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" width={progress.percentage}> {progress.percentage}%</div>
                                  </div>
                                )}

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                            <br/>

                            <h1 className='font-bold text-2xl text-center mb-4'>Uploaded Images:</h1>
                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2 w-20">No.</th>
                                        <th className="border px-4 py-2">Title</th>
                                        <th className="border px-4 py-2 w-[200px]">Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map(({ id, title, name }) => (
                                        <tr key={id}>
                                            <td className="border px-4 py-2 text-center">{ id }</td>
                                            <td className="border px-4 py-2">{ title.toUpperCase() }</td>
                                            <td className="border px-4 py-2">
                                                <img src={name} width="200px" />
                                            </td>
                                        </tr>
                                    ))}

                                    {files.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="3"
                                            >
                                                No Image found! Upload Some Image.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
