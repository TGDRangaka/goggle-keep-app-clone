import api, { EAPIS } from "./api"

export const userLoginApi = async (user: any) => {
    const respond = await api.post(EAPIS.USER, user);

    if (respond.status === 201) {
        return respond.data.data;
    } else {
        throw new Error('Failed to login user:'+ respond.data.message);
    }
}