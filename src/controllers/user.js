import { sendSuccess } from '../utils/response.js';

export const getMe = async (req, res) => {
  const user = req.currentUser;

  sendSuccess(res, {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
};
