'use client';
import styles from './rightBar.module.css';
import ManageAccount from '../manageAccount/ManageAccount';
import { useAuth } from '@/context/AuthContext';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

const RightBar = () => {
	const { activeTab } = useAuth();

	return (
		<div className={styles.container}>
			<Suspense fallback={<Loading />}>
				{activeTab === 'profile' && <ManageAccount />}
			</Suspense>
		</div>
	);
};

export default RightBar;
