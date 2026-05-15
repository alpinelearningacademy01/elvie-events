import axios from 'axios';

const API_URL = 'http://localhost:5000/api/properties';

const getAuthHeaders = () => {
    const storedUser = localStorage.getItem('elvie_auth_user');
    if (storedUser) {
        const { token } = JSON.parse(storedUser);
        return {
            'Authorization': `Bearer ${token}`
        };
    }
    return {};
};

const prepareFormData = (formData: any) => {
    const data = new FormData();
    
    // Extract files
    if (formData.heroImage instanceof File) {
        data.append('heroImage', formData.heroImage);
    }
    
    if (formData.regularImages) {
        formData.regularImages.forEach((img: any) => {
            if (img.file instanceof File) {
                data.append('regularImages', img.file);
            }
        });
    }

    if (formData.weddingImages) {
        formData.weddingImages.forEach((img: any) => {
            if (img.file instanceof File) {
                data.append('weddingImages', img.file);
            }
        });
    }

    if (formData.floorPlans) {
        formData.floorPlans.forEach((plan: any) => {
            if (plan.file instanceof File) {
                data.append('floorPlans', plan.file);
            }
        });
    }

    if (formData.videoFile instanceof File) {
        data.append('video', formData.videoFile);
    }

    if (formData.virtualTourFile instanceof File) {
        data.append('virtualTour', formData.virtualTourFile);
    }

    if (formData.menus) {
        formData.menus.forEach((menu: any) => {
            if (menu.file instanceof File) {
                data.append('menus', menu.file);
            }
        });
    }

    if (formData.foodPhotos) {
        formData.foodPhotos.forEach((photo: any) => {
            if (photo.file instanceof File) {
                data.append('foodPhotos', photo.file);
            }
        });
    }

    if (formData.venues) {
        formData.venues.forEach((venue: any) => {
            if (venue.images) {
                venue.images.forEach((img: any) => {
                    if (img.file instanceof File) {
                        data.append('venueImages', img.file);
                    }
                });
            }
            if (venue.floorPlans) {
                venue.floorPlans.forEach((plan: any) => {
                    if (plan.file instanceof File) {
                        data.append('venueFloorPlans', plan.file);
                    }
                });
            }
        });
    }

    // Append the rest of the data as a JSON string
    const { 
        heroImage, 
        heroImagePreview, 
        regularImages, 
        weddingImages, 
        floorPlans, 
        menus,
        foodPhotos,
        videoFile,
        videoPreview,
        virtualTourFile,
        virtualTourPreview,
        currentPhotoTitle, 
        currentPhotoDescription,
        venues,
        ...rest 
    } = formData;
    
    // Metadata for images
    const regularImagesMetadata = regularImages?.map((img: any) => ({
        title: img.title,
        description: img.description,
        url: typeof img.file === 'string' ? img.file : undefined // Keep existing URLs
    }));

    const weddingImagesMetadata = weddingImages?.map((img: any) => ({
        title: img.title,
        description: img.description,
        url: typeof img.file === 'string' ? img.file : undefined
    }));

    const floorPlansMetadata = floorPlans?.map((plan: any) => ({
        title: plan.title,
        url: typeof plan.file === 'string' ? plan.file : undefined
    }));

    const menusMetadata = menus?.map((menu: any) => ({
        title: menu.title,
        url: typeof menu.file === 'string' ? menu.file : undefined
    }));

    const foodPhotosMetadata = foodPhotos?.map((photo: any) => 
        typeof photo.file === 'string' ? photo.file : undefined
    );

    const videoMetadata = {
        title: formData.videoTitle,
        description: formData.videoDescription
    };

    const virtualTourMetadata = {
        title: formData.virtualTourTitle,
        description: formData.virtualTourDescription
    };

    const venuesMetadata = venues?.map((venue: any) => ({
        ...venue,
        images: venue.images?.map((img: any) => ({
            url: typeof img.file === 'string' ? img.file : (img.preview ? undefined : img),
            isNew: img.file instanceof File
        })),
        floorPlans: venue.floorPlans?.map((plan: any) => ({
            url: typeof plan.file === 'string' ? plan.file : (plan.preview ? undefined : plan),
            isNew: plan.file instanceof File
        }))
    }));

    data.append('data', JSON.stringify({
        ...rest,
        heroImagePreview: typeof formData.heroImagePreview === 'string' ? formData.heroImagePreview : undefined,
        videoPreview: typeof formData.videoPreview === 'string' ? formData.videoPreview : undefined,
        virtualTourPreview: typeof formData.virtualTourPreview === 'string' ? formData.virtualTourPreview : undefined,
        regularImagesMetadata,
        weddingImagesMetadata,
        floorPlansMetadata,
        menusMetadata,
        foodPhotosMetadata,
        videoMetadata,
        virtualTourMetadata,
        venues: venuesMetadata
    }));

    return data;
};

export const addProperty = async (formData: any) => {
    const data = prepareFormData(formData);

    const response = await axios.post(API_URL, data, {
        headers: {
            ...getAuthHeaders()
        }
    });

    return response.data;
};

export const updateProperty = async (id: string, formData: any) => {
    const data = prepareFormData(formData);

    const response = await axios.put(`${API_URL}/${id}`, data, {
        headers: {
            ...getAuthHeaders()
        }
    });

    return response.data;
};

export const getProperties = async () => {
    const response = await axios.get(API_URL, {
        headers: getAuthHeaders()
    });
    return response.data;
};

export const getPropertyById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders()
    });
    return response.data;
};
