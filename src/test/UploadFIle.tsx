import React, { useRef, useState } from 'react'

function UploadFIle() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  
    const fileInputRef = useRef<HTMLInputElement>(null);  
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {  
        const file = event.target.files ? event.target.files[0] : null;  
        setSelectedFile(file);  
    };  
  
    const handleClick = () => {  
        if (fileInputRef.current) {  
        fileInputRef.current.click();  
        }  
    };  
  
  return (  
    <div className="upload-wrapper" onClick={handleClick}>  
      <input  
        type="file"  
        ref={fileInputRef}  
        onChange={handleFileChange}  
        style={{ display: 'none' }}  
      />  
      <div className="default-avatar">  
        {selectedFile ? (  
          <img src={URL.createObjectURL(selectedFile)} alt="Selected Avatar" />  
        ) : (  
          <span>默认头像</span>  
        )}  
      </div>  
    </div>  
  );  
}

export default UploadFIle