import type {NextApiRequest, NextApiResponse} from 'next';
import {getEnv} from '@/utils/getEnv.util';
import {ENV} from '@/enum';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token || '';

    try {
        const response = await fetch(`${getEnv(ENV.BACKEND_URL)}/auth/revalidate`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const data = await response.json();

        if (data.token) {
            res.setHeader('Set-Cookie', `token=${data.token}; Path=/; Max-Age=${60 * 60 * 24 * 30}; HttpOnly; Secure; SameSite=Strict`);
        } else {
            res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0');
        }

        return res.status(200).json({ok: true});
    } catch {
        return res.status(500).json({ok: false});
    }
}
