import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
import { useState, useRef, useEffect } from 'react';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (setPreview) setPreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Clean up object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const hasValidPreview = previewUrl || preview;

  return (
    <div className='flex justify-center mb-6'>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleImageUpload}
        className='hidden'
      />
      {hasValidPreview ? (
        <div className='relative'>
          <img
            src={previewUrl || preview}
            alt='Profile Preview'
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <div className='w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer'>
          <LuUser className='text-4xl text-orange-500' />
          <button
            type='button'
            className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
