import Image from 'next/image';

const loading = () => {
	return (
		<div className={'loadingContainer'}>
			<Image
				src={'/loading.gif'}
				alt="loading"
				width={50}
				height={50}
				unoptimized
			/>
		</div>
	);
};

export default loading;
