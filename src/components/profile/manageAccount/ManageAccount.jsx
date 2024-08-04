'use client';
import Image from 'next/image';
import styles from './manageAccount.module.css';
import { useAuth } from '@/context/AuthContext';
import EditForm from './editForm/EditForm';

const ManageAccount = () => {
	const { user, updateAccount } = useAuth();

	return (
		<div className={styles.container}>
			<div className={styles.profile}>
				<div className={styles.profileImgContainer}>
					<Image
						className={styles.profileImg}
						src={user?.avatar || '/avatar.png'}
						alt="avatar"
						width={200}
						height={200}
					/>
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
