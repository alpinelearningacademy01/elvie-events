const Property = require('../models/Property');

// Helper to clean malformed string data if it looks like JS object output
const cleanVenuesData = (data) => {
    if (typeof data !== 'string') return data;

    try {
        // Try standard parse first
        return JSON.parse(data);
    } catch (e) {
        try {
            // If it looks like the weird JS format "[ \n' + ... ]"
            if (data.includes("' +") || data.includes("\\n")) {
                let cleaned = data
                    .replace(/\\n/g, '') // Remove literal \n
                    .replace(/' \+ \n?\s*'/g, '') // Remove ' + ' or ' + \n '
                    .replace(/' \+/g, '') // Remove trailing ' +
                    .replace(/\+ '/g, '') // Remove leading + '
                    .replace(/'/g, '"') // Replace single quotes with double
                    .trim();

                // If it starts and ends with double quotes but is not a valid JSON yet
                if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
                    cleaned = cleaned.substring(1, cleaned.length - 1);
                }

                // Try to parse the cleaned version
                return JSON.parse(cleaned);
            }
        } catch (err) {
            console.error('Cleaning failed:', err.message);
        }
    }
    return data;
};

// @desc    Add new property
// @route   POST /api/properties
// @access  Private (Assume Venue Partner is logged in)
exports.addProperty = async (req, res) => {
    try {
        const propertyData = JSON.parse(req.body.data);
        console.log('VENUES DATA TYPE:', typeof propertyData.venues);
        console.log('VENUES DATA:', propertyData.venues);

        // Handle images from S3 upload
        if (req.files) {
            if (req.files.heroImage) {
                propertyData.heroImage = req.files.heroImage[0].location;
            }

            propertyData.images = [];

            if (req.files.regularImages) {
                req.files.regularImages.forEach((file, index) => {
                    const metadata = propertyData.regularImagesMetadata ? propertyData.regularImagesMetadata[index] : {};
                    propertyData.images.push({
                        url: file.location,
                        title: metadata.title || '',
                        description: metadata.description || '',
                        eventType: 'regular'
                    });
                });
            }

            if (req.files.weddingImages) {
                req.files.weddingImages.forEach((file, index) => {
                    const metadata = propertyData.weddingImagesMetadata ? propertyData.weddingImagesMetadata[index] : {};
                    propertyData.images.push({
                        url: file.location,
                        title: metadata.title || '',
                        description: metadata.description || '',
                        eventType: 'wedding'
                    });
                });
            }

            // Handle other file types similarly (menus, foodPhotos, etc.)
            propertyData.fnb = {
                options: propertyData.fnbOptions || [],
                cuisineType: propertyData.cuisineType || '',
                foodPreference: propertyData.foodPreference || '',
                requirements: propertyData.fnbRequirements || '',
                menus: [],
                foodPhotos: []
            };

            if (req.files.menus) {
                propertyData.fnb.menus = req.files.menus.map((file, index) => {
                    const metadata = propertyData.menusMetadata ? propertyData.menusMetadata[index] : {};
                    return {
                        url: file.location,
                        title: metadata.title || ''
                    };
                });
            }

            if (req.files.foodPhotos) {
                propertyData.fnb.foodPhotos = req.files.foodPhotos.map(file => file.location);
            }

            if (req.files.video) {
                const metadata = propertyData.videoMetadata || {};
                propertyData.video = {
                    url: req.files.video[0].location,
                    title: metadata.title || '',
                    description: metadata.description || ''
                };
            } else if (propertyData.videoUrl) {
                propertyData.video = {
                    url: propertyData.videoUrl,
                    title: propertyData.videoTitle || '',
                    description: propertyData.videoDescription || ''
                };
            }

            if (req.files.virtualTour) {
                const metadata = propertyData.virtualTourMetadata || {};
                propertyData.virtualTour = {
                    url: req.files.virtualTour[0].location,
                    title: metadata.title || '',
                    description: metadata.description || ''
                };
            } else if (propertyData.virtualTourUrl) {
                // If they provided a link instead of a file
                propertyData.virtualTour = {
                    url: propertyData.virtualTourUrl,
                    title: propertyData.virtualTourTitle || '',
                    description: propertyData.virtualTourDescription || ''
                };
            }

            // Handle floor plans
            if (req.files.floorPlans) {
                propertyData.floorPlans = req.files.floorPlans.map((file, index) => {
                    const metadata = propertyData.floorPlansMetadata ? propertyData.floorPlansMetadata[index] : {};
                    return {
                        url: file.location,
                        title: metadata.title || ''
                    };
                });
            }

            // Handle venue files
            if (propertyData.venues) {
                propertyData.venues = cleanVenuesData(propertyData.venues);

                if (Array.isArray(propertyData.venues)) {
                    let imageIdx = 0;
                    let floorPlanIdx = 0;

                    propertyData.venues = propertyData.venues.map((venue, idx) => {
                        let v = cleanVenuesData(venue);

                        if (v && typeof v === 'object') {
                            v = { ...v };

                            if (v.images && Array.isArray(v.images)) {
                                v.images = v.images.map(img => {
                                    if (img && img.isNew && req.files.venueImages && req.files.venueImages[imageIdx]) {
                                        return req.files.venueImages[imageIdx++].location;
                                    }
                                    return typeof img === 'string' ? img : (img?.url || null);
                                }).filter(url => url);
                            }

                            if (v.floorPlans && Array.isArray(v.floorPlans)) {
                                v.floorPlans = v.floorPlans.map(plan => {
                                    if (plan && plan.isNew && req.files.venueFloorPlans && req.files.venueFloorPlans[floorPlanIdx]) {
                                        return req.files.venueFloorPlans[floorPlanIdx++].location;
                                    }
                                    return typeof plan === 'string' ? plan : (plan?.url || null);
                                }).filter(url => url);
                            }
                        }

                        return v;
                    });
                }
            }
        }

        // Cleanup metadata from data object
        delete propertyData.regularImagesMetadata;
        delete propertyData.weddingImagesMetadata;
        delete propertyData.floorPlansMetadata;

        // Map flattened address fields to schema structure
        if (propertyData.addressTitle || propertyData.streetAddress || propertyData.city) {
            propertyData.address = {
                title: propertyData.addressTitle,
                street: propertyData.streetAddress,
                city: propertyData.city,
                state: propertyData.state,
                zipCode: propertyData.zipCode,
                country: propertyData.country
            };
        }

        if (propertyData.mapLink) {
            propertyData.location = {
                mapLink: propertyData.mapLink
            };
        }

        // Add partner ID from auth middleware
        propertyData.partner = req.user._id;

        const property = await Property.create(propertyData);

        res.status(201).json({
            success: true,
            data: property
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
    try {
        const propertyData = JSON.parse(req.body.data);
        const propertyId = req.params.id;

        // Handle images from S3 upload
        if (req.files) {
            if (req.files.heroImage) {
                propertyData.heroImage = req.files.heroImage[0].location;
            }

            // Handle regular images
            const existingRegularImages = propertyData.regularImagesMetadata?.filter(m => m.url).map(m => ({
                url: m.url,
                title: m.title,
                description: m.description,
                eventType: 'regular'
            })) || [];

            const newRegularImages = (req.files.regularImages || []).map((file, index) => {
                // New files correspond to metadata entries WITHOUT a url
                const newMetadataEntries = propertyData.regularImagesMetadata?.filter(m => !m.url) || [];
                const metadata = newMetadataEntries[index] || {};
                return {
                    url: file.location,
                    title: metadata.title || '',
                    description: metadata.description || '',
                    eventType: 'regular'
                };
            });

            // Handle wedding images
            const existingWeddingImages = propertyData.weddingImagesMetadata?.filter(m => m.url).map(m => ({
                url: m.url,
                title: m.title,
                description: m.description,
                eventType: 'wedding'
            })) || [];

            const newWeddingImages = (req.files.weddingImages || []).map((file, index) => {
                const newMetadataEntries = propertyData.weddingImagesMetadata?.filter(m => !m.url) || [];
                const metadata = newMetadataEntries[index] || {};
                return {
                    url: file.location,
                    title: metadata.title || '',
                    description: metadata.description || '',
                    eventType: 'wedding'
                };
            });

            propertyData.images = [
                ...existingRegularImages,
                ...newRegularImages,
                ...existingWeddingImages,
                ...newWeddingImages
            ];

            // Handle menus
            const existingMenus = propertyData.menusMetadata?.filter(m => m.url).map(m => ({
                url: m.url,
                title: m.title
            })) || [];

            const newMenus = (req.files.menus || []).map((file, index) => {
                const newMetadataEntries = propertyData.menusMetadata?.filter(m => !m.url) || [];
                const metadata = newMetadataEntries[index] || {};
                return {
                    url: file.location,
                    title: metadata.title || ''
                };
            });

            // Handle food photos
            const existingFoodPhotos = propertyData.foodPhotosMetadata?.filter(m => typeof m === 'string') || [];
            const newFoodPhotos = (req.files.foodPhotos || []).map(file => file.location);

            propertyData.fnb = {
                options: propertyData.fnbOptions || [],
                cuisineType: propertyData.cuisineType || '',
                foodPreference: propertyData.foodPreference || '',
                requirements: propertyData.fnbRequirements || '',
                menus: [...existingMenus, ...newMenus],
                foodPhotos: [...existingFoodPhotos, ...newFoodPhotos]
            };

            // Handle floor plans
            const existingFloorPlans = propertyData.floorPlansMetadata?.filter(m => m.url).map(m => ({
                url: m.url,
                title: m.title
            })) || [];

            const newFloorPlans = (req.files.floorPlans || []).map((file, index) => {
                const newMetadataEntries = propertyData.floorPlansMetadata?.filter(m => !m.url) || [];
                const metadata = newMetadataEntries[index] || {};
                return {
                    url: file.location,
                    title: metadata.title || ''
                };
            });

            propertyData.floorPlans = [...existingFloorPlans, ...newFloorPlans];

            if (req.files.video) {
                const metadata = propertyData.videoMetadata || {};
                propertyData.video = {
                    url: req.files.video[0].location,
                    title: metadata.title || '',
                    description: metadata.description || ''
                };
            } else if (propertyData.videoUrl) {
                propertyData.video = {
                    url: propertyData.videoUrl,
                    title: propertyData.videoTitle || '',
                    description: propertyData.videoDescription || ''
                };
            }

            if (req.files.virtualTour) {
                const metadata = propertyData.virtualTourMetadata || {};
                propertyData.virtualTour = {
                    url: req.files.virtualTour[0].location,
                    title: metadata.title || '',
                    description: metadata.description || ''
                };
            } else if (propertyData.virtualTourUrl) {
                propertyData.virtualTour = {
                    url: propertyData.virtualTourUrl,
                    title: propertyData.virtualTourTitle || '',
                    description: propertyData.virtualTourDescription || ''
                };
            }

            // Handle venue files
            if (propertyData.venues) {
                propertyData.venues = cleanVenuesData(propertyData.venues);

                if (Array.isArray(propertyData.venues)) {
                    let imageIdx = 0;
                    let floorPlanIdx = 0;

                    propertyData.venues = propertyData.venues.map((venue, idx) => {
                        let v = cleanVenuesData(venue);

                        if (v && typeof v === 'object') {
                            v = { ...v };

                            if (v.images && Array.isArray(v.images)) {
                                v.images = v.images.map(img => {
                                    if (img && img.isNew && req.files.venueImages && req.files.venueImages[imageIdx]) {
                                        return req.files.venueImages[imageIdx++].location;
                                    }
                                    return typeof img === 'string' ? img : (img?.url || null);
                                }).filter(url => url);
                            }

                            if (v.floorPlans && Array.isArray(v.floorPlans)) {
                                v.floorPlans = v.floorPlans.map(plan => {
                                    if (plan && plan.isNew && req.files.venueFloorPlans && req.files.venueFloorPlans[floorPlanIdx]) {
                                        return req.files.venueFloorPlans[floorPlanIdx++].location;
                                    }
                                    return typeof plan === 'string' ? plan : (plan?.url || null);
                                }).filter(url => url);
                            }
                        }

                        return v;
                    });
                }
            }
        }

        // Cleanup metadata
        delete propertyData.regularImagesMetadata;
        delete propertyData.weddingImagesMetadata;
        delete propertyData.floorPlansMetadata;
        delete propertyData.menusMetadata;
        delete propertyData.videoMetadata;
        delete propertyData.virtualTourMetadata;

        // Remove flattened F&B fields after mapping
        delete propertyData.fnbOptions;
        delete propertyData.cuisineType;
        delete propertyData.foodPreference;
        delete propertyData.fnbRequirements;

        // Map flattened address fields to schema structure
        if (propertyData.addressTitle || propertyData.streetAddress || propertyData.city) {
            propertyData.address = {
                title: propertyData.addressTitle,
                street: propertyData.streetAddress,
                city: propertyData.city,
                state: propertyData.state,
                zipCode: propertyData.zipCode,
                country: propertyData.country
            };
        }

        if (propertyData.mapLink) {
            propertyData.location = {
                mapLink: propertyData.mapLink
            };
        }

        const property = await Property.findByIdAndUpdate(propertyId, propertyData, {
            new: true,
            runValidators: true
        });

        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('partner', 'name email');
        res.status(200).json({
            success: true,
            data: properties
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: 'Property not found'
            });
        }
        res.status(200).json({
            success: true,
            data: property
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
