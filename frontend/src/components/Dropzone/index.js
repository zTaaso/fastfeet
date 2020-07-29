import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsImage } from 'react-icons/bs';

import { Container, Content } from './styles';

function Dropzone({ img, onFileChange }) {
  const [imgURL, setImgURL] = useState(img);
  const hasPhoto = !!imgURL;

  useEffect(() => {
    setImgURL(img);
  }, [img]);

  const onDrop = useCallback((acceptedFiles) => {
    const [file] = acceptedFiles;

    const url = URL.createObjectURL(file);
    setImgURL(url);
    onFileChange(file);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Content {...getRootProps()} hasPhoto={hasPhoto}>
        {hasPhoto ? (
          <>
            <img src={imgURL} alt="avatar" />
            <input {...getInputProps()} />
          </>
        ) : (
          <>
            {' '}
            <BsImage color="#DDDDDD" size={50} />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Solte a imagem aqui</p>
            ) : (
              <p>Adicionar foto</p>
            )}{' '}
          </>
        )}
      </Content>
    </Container>
  );
}

export default Dropzone;
