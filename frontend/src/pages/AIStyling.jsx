import React, { useState } from 'react';
import './AIStyling.css';

const AIStyling = () => {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [bodyShape, setBodyShape] = useState('Inverted Triangle');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      return 'Invalid file type. Please upload a JPG or PDF file.';
    }
    if (selectedFile.size > maxSize) {
      return 'File size exceeds 5MB limit.';
    }
    return null;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    const error = validateFile(selectedFile);
    if (error) {
      setErrorMsg(error);
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    
    setErrorMsg('');
    setFile(selectedFile);
    
    if (selectedFile.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl('pdf'); // Indicator for PDF preview
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setErrorMsg('');
  };

  const shapes = [
    { icon: '⬜', label: 'Rectangle' },
    { icon: '△', label: 'Inverted Triangle' },
    { icon: '🍐', label: 'Pear' },
    { icon: '◯', label: 'Oval' }
  ];

  return (
    <div className="aistyling-root">
      <main className="aistyling-content-pro">
        <div className="content-inner-pro">
          <header className="page-header-pro">
            <h1 className="page-title-pro">AI Style Profile</h1>
            <p className="page-subtitle-pro">Refine your digital twin to unlock ultra-precise fit recommendations and personalized smart commerce suggestions.</p>
          </header>

          <div className="aistyling-full-width">
            <section className="hub-card-pro-white">
              <div className="card-header-pro-hub">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                <h3>Physical Metrics</h3>
              </div>
              <div className="metrics-inputs-pro">
                <div className="input-group-pro">
                  <label>Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
                </div>
                <div className="input-group-pro">
                  <label>Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </div>
              <div className="body-shape-selector-pro">
                <label>Body Shape</label>
                <div className="shape-grid-pro">
                  {shapes.map((shape) => (
                    <div 
                      key={shape.label} 
                      className={`shape-item-pro ${bodyShape === shape.label ? 'active' : ''}`}
                      onClick={() => setBodyShape(shape.label)}
                    >
                      <span className="shape-icon-pro">{shape.icon}</span>
                      <span className="shape-label-pro">{shape.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="file-upload-card-pro">
              <div className="file-upload-header-pro">
                <span className="upload-badge-pro">DOCUMENT UPLOAD</span>
                <h3>Upload References</h3>
                <p>Securely upload your body measurement documents (JPG or PDF, max 5MB) for manual review by our styling team.</p>
              </div>
              
              <div 
                className={`upload-dropzone-pro ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {!file ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="upload-icon-pro">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <div className="upload-text-pro">
                      <h4>Drag & Drop your file here</h4>
                      <p>or click to browse</p>
                    </div>
                    <input 
                      type="file" 
                      id="file-upload" 
                      className="file-input-hidden" 
                      accept=".jpg,.jpeg,.pdf"
                      onChange={handleChange}
                    />
                    <label htmlFor="file-upload" className="browse-btn-pro">Browse Files</label>
                  </>
                ) : (
                  <div className="file-preview-pro">
                    {previewUrl === 'pdf' ? (
                      <div className="pdf-preview-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                    ) : (
                      <img src={previewUrl} alt="Preview" className="image-preview-pro" />
                    )}
                    <div className="file-details-pro">
                      <span className="file-name-pro">{file.name}</span>
                      <span className="file-size-pro">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                    <button className="remove-file-btn" onClick={removeFile} title="Remove file">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {errorMsg && <div className="upload-error-pro">{errorMsg}</div>}
            </section>

            <section className="insights-card-pro-blue">
              <div className="insights-header-pro-hub">
                <h3>Size Finder Insights</h3>
                <p>REAL-TIME ANALYSIS</p>
              </div>
              <div className="insight-item-pro-hub">
                <div className="insight-icon-box-pro green">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                </div>
                <div className="insight-text-pro-hub">
                  <strong>Size Accuracy: High</strong>
                  <p>Based on your {bodyShape} profile, we recommend EU 52 for optimal fit.</p>
                </div>
              </div>
              <div className="tip-box-pro-light">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                <p><strong>Professional Tip:</strong> Broad shoulders detected. Look for "Athletic Cut" labels for maximum comfort.</p>
              </div>
              <button className="save-profile-btn-pro">
                Save & Apply Profile
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIStyling;
