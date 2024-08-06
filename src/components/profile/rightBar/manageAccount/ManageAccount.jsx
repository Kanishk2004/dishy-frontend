'use client';
import Image from 'next/image';
import styles from './manageAccount.module.css';
import { useAuth } from '@/context/AuthContext';
import EditForm from './editForm/EditForm';
import { useState } from 'react';
import ImageForm from './imageForm/ImageForm';

const ManageAccount = () => {
	const { user, updateAccount } = useAuth();
	const [imageForm, setImageForm] = useState(false);

	return (
		<div className={styles.container}>
			{imageForm && <ImageForm setImageForm={setImageForm} />}
			<div className={styles.profile}>
				<div className={styles.profileImgContainer}>
					<Image
						className={styles.profileImg}
						src={user?.avatar || '/avatar.png'}
						alt="avatar"
						width={200}
						height={200}
					/>
					<span
						className={styles.editBtn}
						onClick={() => setImageForm(!imageForm)}>
						<Image src={'/edit.png'} alt="edit" width={24} height={24} />
					</span>
				</div>

				<h2 className={styles.fullName}>{user?.fullName || 'John Doe'}</h2>
				<p className={styles.bio}>{user?.bio || ''}</p>
			</div>

			<div className={styles.formContainer}>
				<EditForm user={user} updateAccount={updateAccount} />
			</div>
		</div>
	);
};

export default ManageAccount;
