import axios from "axios"
import { useEffect } from "react"
import { getToken } from "./authentication"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function () {
    const [places, setPlaces] = useState([])
    const token = getToken()
    useEffect(() => {
        axios.get('/place/user', { headers: { Authorization: `Bearer ${token}` } }).then(({ data: { data: { places } } }) => {
            setPlaces(places)
        })
    }, [])
    return (
        <div className="mt-4">
            {places.length && places.map(place => (
                <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 bg-gray-200 mt-2 p-2 rounded-2xl " key={place._id}>
                    <div className="flex w-32  h-32 bg-gray-300 grow shrink-0">
                        {place.photos.length > 0 && (
                            <div className="h-32 flex" key={place._id}>
                                <img className="object-cover" src={"http://localhost:3000/uploads/" + place.photos[0]} alt="Not found" />

                            </div>
                        )}
                    </div>
                    <div className="grow-0 shrink">
                        <h2 className="text-xl ">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                    </div>

                </Link>
            ))}
        </div>
    )
}