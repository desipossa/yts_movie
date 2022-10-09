import React from 'react'
import { useParams } from 'react-router-dom'

const Detail = ({ movie, page }) => {
    const { id } = useParams();
    const mcId = movie.find(it => String(it.id) === id)
    return (
        <div style={{ textAlign: "center" }}>

            <img src={mcId?.medium_cover_image} />

            {mcId?.title}
            {console.log(id, mcId)}

        </div>
    )
}

export default Detail