import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Detail from './Detail';

const App = () => {
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(true);
    const [total, setTotal] = useState(1);
    const [paging, setPaging] = useState(1);

    useEffect(() => {
        getMovieData();
    }, [page]);



    const getMovieData = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}`);
        const moviedata = await res.data.data.movies;
        console.log(res, moviedata, res.data.data.movie_count);
        setMovie(moviedata);
        setTotal(res.data.data.movie_count)
        setLoad(false)
    }

    const listIem = 50;

    const listButton = Array.from({ length: (total / listIem) });
    const listLength = 20;
    return (
        <div>
            {
                load ? <div>로딩중입니다.</div>
                    :
                    <>
                        <ul style={{ margin: "50px auto", textAlign: "center" }}>
                            <button onClick={
                                () => paging > 1 ? setPaging(paging - listLength) : setPaging(1)
                            }>PREV</button>
                            {
                                listButton.slice(paging, paging + listLength).map((it, idx) => <button key={idx} onClick={() => setPage(paging + idx)}>{paging + idx}</button>)
                            }
                            <button onClick={
                                () => paging < listButton.length - listLength ? setPaging(paging + listLength) : setPaging(paging)
                            }>NEXT</button>
                        </ul>
                        <Routes>
                            <Route path='/detail/:id' element={<Detail movie={movie} page={page} />} />
                        </Routes>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "50px 10px", width: "1700px", margin: "100px auto" }}>
                            {
                                movie.map((it, idx) => {
                                    return (
                                        <figure key={idx}>
                                            <Link to={`/detail/${it.id}`}>자세히보기</Link>
                                            <img src={it.medium_cover_image} />
                                            <div>NO : {(page - 1) * listIem + idx + 1} / {page} 페이지 {idx + 1}번째 영화 </div>
                                            {it.title}
                                        </figure>
                                    )
                                })
                            }

                        </div>
                    </>


            }

        </div >
    )
}

export default App