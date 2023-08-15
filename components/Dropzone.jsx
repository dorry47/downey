import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  // width: 100,
  // height: 100,
  padding: 4,
  boxSizing: 'border-box',
};

function Previews({ setFileUrl, setFile }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    // accept: 'application/pdf',
    onDrop: (acceptedFiles) => {
      const formData = new FormData();
      formData.append('pdf', acceptedFiles[0]);
      console.log('pdf formData', formData);

      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );

      // setFileUrl(acceptedFiles[0].path);
    },
  });

  useEffect(() => {
    console.log(files);

    if (files.length > 0) {
      setFileUrl(files[0].preview);
      setFile(files[0]);
    }
  }, [files]);

  // const thumbs = files.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <Document
  //       file={file.preview}
  //       renderMode="canvas"
  //       onLoadSuccess={({ numPages }) => {
  //         if (numPages > 1) {
  //           console.log('This file has multiple pages!');
  //         }
  //       }}>
  //       <Page
  //         pageNumber={1}
  //         width={100}
  //         height={100}
  //         renderAnnotationLayer={false}
  //         renderTextLayer={false}
  //       />
  //     </Document>
  //   </div>
  // ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            'w-full border-2 border-[#eaeaea] cursor-pointer p-4 text-center text-[#737373]',
        })}>
        <input {...getInputProps()} />
        <p>
          Drag &lsquo;n&lsquo; drop some PDF files here, or click to select
          files
        </p>
      </div>
      {/* <aside
        className="border-2 border-[#eaeaea] h-fit"
        style={thumbsContainer}>
        {thumbs}
      </aside> */}
    </section>
  );
}

export default Previews;
