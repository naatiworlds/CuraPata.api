import { sign } from 'jsonwebtoken';

export function generateToken(userId) {
    return sign({ userId }, 'secret_key', { expiresIn: '1h' });
}
