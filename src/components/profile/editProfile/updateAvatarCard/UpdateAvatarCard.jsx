import { useCallback, useState } from 'react';
import styles from './updateAvatar.module.css';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { apiURL } from '@/Constant';

const UpdateAvatarCard = ({ setImageEditMode, setEditMode }) => {
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
			const accessToken = localStorage.getItem('accessToken');
			let response = await fetch(`${apiURL}/users/avatar`, {
				method: 'PATCH',
				body: formData,
				credentials: 'include',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			response = await response.json();

			setIsUploading(false);

			if (response.success) {
				setUser(response.data);
				setMessage({
					success: true,
					message: 'Avatar upload successfull',
				});
				setImageEditMode(false);
				setEditMode(false);
			} else {
				console.error('Avatar upload failed: ', response.message);
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
			<div className={styles.closeBtn} onClick={() => setImageEditMode(false)}>
				<Image src={'/close.png'} alt="close" width={30} height={30} />
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
							{isUploading ? 'Uploading...' : 'Upload'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UpdateAvatarCard;
