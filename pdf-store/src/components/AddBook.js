import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import './AddBook.css';
import PdfComp from './PdfComp';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function AddBook() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get('http://localhost:4000/get-files');
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    console.log(title, file);
    const result = await axios.post('http://localhost:4000/upload-files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log('result is:', result);
    if (result.data.status === 'ok') {
      alert('Uploaded Successfully!!!');
      getPdf();
    }
  };

  const showPdf = (pdf) => {
    setPdfFile(`http://localhost:4000/files/${pdf}`);
  };

  return (
    <div className='App'>
      <form className='formStyle' onSubmit={submitImage}>
        <h4>Upload pdf</h4>
        <br />
        <input
          type='text'
          className='form-control'
          placeholder='Title'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type='file'
          className='form-control'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
      
      {/* Conditional rendering based on the presence of PDF files */}
      {allImage && allImage.length > 0 && (
        <div className='uploaded'>
          <h4>uploaded pdf :</h4>
          <div className='output-div'>
            {allImage.map((data) => {
              return (
                <div className='inner-div' key={data.pdf}>
                  <h6>Title : {data.title}</h6>
                  <button className='btn btn-primary' onClick={() => showPdf(data.pdf)}>
                    Show Pdf
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {(!allImage || allImage.length === 0) && (
        <div className='no-pdf-message'>
          No PDF files uploaded yet. Please upload a PDF to view it here.
        </div>
      )}

      {pdfFile && <PdfComp pdfFile={pdfFile} />}
    </div>
  );
}

export default AddBook;
