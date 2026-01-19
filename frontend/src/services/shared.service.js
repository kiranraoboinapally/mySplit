import api from '../api/axios';

const getOwedByMe = async () => {
    const response = await api.get('/shared/owed');
    return response.data;
};

const getLendedByMe = async () => {
    const response = await api.get('/shared/lended');
    return response.data;
};

const SharedService = {
    getOwedByMe,
    getLendedByMe
};

export default SharedService;
