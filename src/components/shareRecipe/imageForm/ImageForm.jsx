'use client';
import { useCallback } from 'react';
import styles from './imageForm.module.css';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import imageCompression from 'browser-image-compression';

const ImageForm = ({ selectedImages, setSelectedImages }) => {
	const { setMessage } = useAuth();

	const onDrop = useCallback(
		async (acceptedFiles) => {
			if (selectedImages.length + acceptedFiles.length > 5) {
				setMessage({
					success: false,
					message: 'You can only upload up to 5 images.',
				});
				return;
			}

			const newFiles = await Promise.all(
				acceptedFiles.map(async (file) => {
					const compressedFile = await imageCompression(file, {
						maxSizeMB: 1, // Set the max size of the compressed image
						maxWidthOrHeight: 1024, // Set the max width or height of the image
					});

					const convertedFile = new File([compressedFile], file.name, {
						type: file.type,
						lastModified: file.lastModified,
					});

					return Object.assign(convertedFile, {
						preview: URL.createObjectURL(compressedFile),
					});
				})
			);

			setSelectedImages((prevImages) => [...prevImages, ...newFiles]);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[selectedImages]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
		multiple: true,
	});

	const removeImage = (index, e) => {
		e.preventDefault();
		setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>Recipe Image: </p>
			{selectedImages.length > 0 && (
				<div className={styles.previewContainer}>
					{selectedImages.map((image, index) => (
						<div key={index} className={styles.previewItem}>
							<Image
								src={image.preview}
								alt={`Preview ${index + 1}`}
								className={styles.imageStyle}
								width={230}
								height={150}
							/>
							<button
								className={styles.removeBtn}
								onClick={(e) => removeImage(index, e)}>
								<Image
									className={styles.deleteIcon}
									src={'/delete.png'}
									alt="delete"
									width={15}
									height={15}
								/>
							</button>
						</div>
					))}
				</div>
			)}
			<div
				{...getRootProps({ className: 'dropzone' })}
				className={styles.dropzoneStyle}>
				<input {...getInputProps()} />
				<p>Drag & drop images here, or click to select up to 5 images</p>
			</div>
		</div>
	);
};

export default ImageForm;
