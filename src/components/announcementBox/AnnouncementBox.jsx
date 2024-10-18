'use client';
import Image from 'next/image';
import styles from './announcementBox.module.css';
import { useState } from 'react';

const AnnouncementBox = () => {
	const [visible, setVisible] = useState(true);
	return (
		<div>
			{visible && (
				<div className={styles.popUp}>
					<div className={styles.closeBtn} onClick={() => setVisible(false)}>
						<Image src={'/menuClose.png'} alt="close" width={20} height={20} />
					</div>
					<div>
						<p>
							The backend server for this application is currently inactive. It
							was live for over two months, during which time it provided a
							fully functional experience. However, as this project is a hobby
							endeavor, maintaining the server became cost-prohibitive. While
							the live application is currently offline, the complete source
							code is available on my{' '}
							<a href="https://github.com/Kanishk2004">
								<b> Github Profile</b>
							</a>{' '}
							for those interested in exploring the project or contributing to
							its development. Feel free to review the code and reach out with
							any questions or feedback.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default AnnouncementBox;
