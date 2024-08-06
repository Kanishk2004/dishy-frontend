'use client';
import { useCallback, useState } from 'react';
import styles from './imageForm.module.css';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

const ImageForm = ({ setImageForm }) => {
	const { setMessage, setUser } = useAuth();
	const [isUploading, setIsUploading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		setSelectedImage(
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*',
		multiple: false,
	});

	const handleAvatarUpload = async () => {
		setIsUploading(true);

		const formData = new FormData();
		formData.append('avatar', selectedImage);

		try {
			let response = await fetch(`${apiURL}/users/avatar`, {
				method: 'PATCH',
				body: formData,
				credentials: 'include',
			});

			response = await response.json();

			setIsUploading(false);

			if (response.success) {
				setUser(response.data);
				setMessage({
					success: true,
					message: 'Avatar upload successfull',
				});
				setImageForm(false);
			} else {
				console.error('Login failed: ', response.message);
			}
		} catch (error) {
			setIsUploading(false);
			setMessage({
				success: false,
				message: 'Something went wrong!',
			});
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.closeBtn} onClick={() => setImageForm(false)}>
				<Image src={'/close.png'} alt="close" width={40} height={40} />
			</div>
			<div className={styles.formContainer}>
				<div
					{...getRootProps({ className: 'dropzone' })}
					className={styles.dropzoneStyle}>
					<input {...getInputProps()} />
					<p>Drag & drop an image here, or click to select one</p>
				</div>
				{selectedImage && (
					<div className={styles.previewStyle}>
						<Image
							src={selectedImage.preview}
							alt="Preview"
							className={styles.imageStyle}
							width={100}
							height={100}
						/>
						<button className={styles.uploadBtn} onClick={handleAvatarUpload}>
							Upload
						</button>
					</div>
				)}
				{isUploading && <p>Uploading...</p>}
			</div>
		</div>
	);
};

export default ImageForm;