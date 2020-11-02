import axios from 'axios';

const getReq = async () => {
	const { data } = await axios.get(
		'http://localhost:5000/api/cake/5f9eb7a22441b12d9c344fae'
	);
	console.log(data.data);
};

getReq();
