import { auth } from '@/auth';

export const useToken = async () => {
    const session = await auth();
    return session?.user.accessToken;
};
