'use client';
import { useCallback, useState } from 'react';
import styles from './imageForm.module.css';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

const ImageForm = ({ setImageForm, formData }) => {
	const { setMessage, setUser } = useAuth();
	const [save, setSave] = useState(false);
	const [selectedImages, setSelectedImages] = useState([]);

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

					return Object.assign(compressedFile, {
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

	const handleRecipeImage = async (e) => {
		e.preventDefault();
		selectedImages.forEach((image, index) => {
			formData.append(`image${index + 1}`, image);
		});
		setSave(true);
	};

	const removeImage = (index, e) => {
		e.preventDefault();
		setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	return (
		<div className={styles.container}>
			<div
				{...getRootProps({ className: 'dropzone' })}
				className={styles.dropzoneStyle}>
				<input {...getInputProps()} />
				<p>Drag & drop images here, or click to select up to 5 images</p>
			</div>
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
									src={'/delete.png'}
									alt="delete"
									width={15}
									height={15}
								/>
							</button>
						</div>
					))}
					<button
						className={styles.uploadBtn}
						onClick={(e) => handleRecipeImage(e)}>
						{save ? 'Saved' : 'Save'}
					</button>
				</div>
			)}
		</div>
	);
};

export default ImageForm;
