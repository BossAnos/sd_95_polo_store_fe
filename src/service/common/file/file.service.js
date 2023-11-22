import axios from "axios";
import { AppApiError } from "../error/AppApiError";

const UPLOAD_PRESET = 'yccw2di0';


export const uploadFile = async ({
    publicId,
    file
}) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('public_id', publicId);
    formData.append('upload_preset', UPLOAD_PRESET);
    try {
        const {data} = await axios.post('https://api.cloudinary.com/v1_1/dnhit6upf/image/upload', formData);
        return data;
    } catch (error) {
        console.log(error);
        throw new AppApiError(error, 'Cloud service is not available')
    }
    
}