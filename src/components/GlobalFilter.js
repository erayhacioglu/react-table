import React from 'react';

const GlobalFilter = ({ filter, setFilter }) => {
	return (
		<span>
			<input
				className='form-control mb-2'
				value={filter || ''}
				onChange={(e) => setFilter(e.target.value)}
				placeholder='Ara...'
			/>
		</span>
	);
};

export default GlobalFilter;
