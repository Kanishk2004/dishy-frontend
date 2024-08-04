import LeftBar from '@/components/profile/leftBar/LeftBar';
import styles from './profile.module.css';
import RightBar from '@/components/profile/rightBar/RightBar';
import { Suspense } from 'react';
import Loading from '@/components/loading/Loading';

const profile = () => {
	return (
		<div className={styles.container}>
			<div className={styles.leftBar}>
				<Suspense fallback={<Loading />}>
					<LeftBar />
				</Suspense>
			</div>
			<div className={styles.rightBar}>
				<Suspense fallback={<Loading />}>
					<RightBar />
				</Suspense>
			</div>
		</div>
	);
};

export default profile;
