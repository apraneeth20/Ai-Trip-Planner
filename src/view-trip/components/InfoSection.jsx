// import React, { useEffect, useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'

// function InfoSection({ trip }) {

//     const [photoUrl, setPhotoUrl] = useState();

//     useEffect(() => {
//         trip && GetPlacePhoto();
//     }, [trip])

//     const GetPlacePhoto = async () => {
//         const data = {
//             textQuery: trip?.userSelection?.location?.label
//         }
//         const result = await GetPlaceDetails(data).then(resp => {
//             console.log(resp.data.places[0].photos[3].name)
//             const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
//             setPhotoUrl(PhotoUrl)
//         })
//     }
    
//     return (
//         <div>
//             <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt="img" className='h-[340px] w-full object-cover rounded-xl' />
//             <div>
//                 <div className='my-5 flex flex-col gap-2'>
//                     <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
//                     <div className='flex gap-5'>
//                         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md '>📅{trip.userSelection?.noOfDays} Day</h2>
//                         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰{trip.userSelection?.budget} Budget</h2>
//                         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>👥No. of traveler/s: {trip.userSelection?.traveler}</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default InfoSection



import React, { useEffect, useState } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg'); // Default to placeholder

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label || 'Default Location',
        };

        try {
            const response = await GetPlaceDetails(data);

            // Validate API response and photos
            const places = response?.data?.places || [];
            const firstPlace = places[0];
            const photos = firstPlace?.photos || [];

            if (photos.length > 0) {
                // Use the first available photo for simplicity
                const photoName = photos[0].name;

                // Construct the photo URL
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                setPhotoUrl(photoUrl);
            } else {
                console.warn('No photos available for the selected place');
            }
        } catch (error) {
            console.error('Error fetching place details:', error.message);
        }
    };

    return (
        <div>
            <img
                src={photoUrl}
                alt="Place"
                className="h-[340px] w-full object-cover rounded-xl"
            />
            <div>
                <div className="my-5 flex flex-col gap-2">
                    <h2 className="font-bold text-2xl">{trip?.userSelection?.location?.label}</h2>
                    <div className="flex gap-5">
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            📅 {trip.userSelection?.noOfDays} Day
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            💰 {trip.userSelection?.budget} Budget
                        </h2>
                        <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
                            👥 No. of traveler/s: {trip.userSelection?.traveler}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
