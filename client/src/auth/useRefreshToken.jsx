import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/v1/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {
                ...prev,
                username: response.data.user?.username,
                avatar: response.data.user?.avatar,
                email: response.data.user?.email,
                role: response.data.user?.role,
                accessToken: response.data.accessToken
            }

        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;