import { useMemo, useState, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };


const testDropZone = () => {
    const [images, setImages] = useState([])
    const [imageSrc, setImageSrc] = useState("")

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone({
        noClick: true,
        accept: {'image/*': []},
        multiple: true,
        maxFiles: 1,
        onDropAccepted: (acceptedFiles) => {
            setImages(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                })
              )
            );
        },
    });

    useEffect(() => {
        const imageSrcFunc = () =>
          images.map((image) => setImageSrc(image.preview));
        imageSrcFunc();
    }, [images]);

    useEffect(() => {
        return () => images.forEach((image) => URL.revokeObjectURL(image.preview));
    }, []);

    const resetImage = () => {
        setImageSrc("");
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return {
        imageSrc,
        getRootProps,
        getInputProps,
        open,
        resetImage,
        style,
    }
    // return (
    //     <div className="container">
    //       <div {...getRootProps({style})}>
    //         <input
    //             {...getInputProps()}
    //         />

    //         <p>Drag 'n' drop some files here, or click to select files</p>
    //       </div>
    //     </div>
    // );
}

export default testDropZone
