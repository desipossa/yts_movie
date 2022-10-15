import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
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

    //https://yts.mx/api/v2/list_movies.json?query_term=2022&limit=50
    //https://yts.mx/api/v2/list_movies.json?query_term=2022&limit=50&page=10
    //https://yts.mx/api/v2/list_movies.json?sort_by=rating
    //https://yts.mx/api#list_movies


    //https://developers.naver.com/docs/serviceapi/search/movie/movie.md


    //   <?php
    //   $client_id = "YOUR_CLIENT_ID";
    //   $client_secret = "YOUR_CLIENT_SECRET";
    //   $encText = urlencode("네이버오픈API");
    //   $url = "https://openapi.naver.com/v1/search/blog?query=".$encText; // json 결과
    // //  $url = "https://openapi.naver.com/v1/search/blog.xml?query=".$encText; // xml 결과
    //   $is_post = false;
    //   $ch = curl_init();
    //   curl_setopt($ch, CURLOPT_URL, $url);
    //   curl_setopt($ch, CURLOPT_POST, $is_post);
    //   curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //   $headers = array();
    //   $headers[] = "X-Naver-Client-Id: ".$client_id;
    //   $headers[] = "X-Naver-Client-Secret: ".$client_secret;
    //   curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    //   curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    //   $response = curl_exec ($ch);
    //   $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //   echo "status_code:".$status_code."
    // ";
    //   curl_close ($ch);
    //   if($status_code == 200) {
    //     echo $response;
    //   } else {
    //     echo "Error 내용:".$response;
    //   }
    // ?>

    const natigate = useNavigate();

    const getMovieData = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=50&page=${page}&query_term=`);
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
                                listButton.slice(paging, paging + listLength).map((it, idx) => <button key={idx} onClick={
                                    () => {
                                        setPage(paging + idx);
                                        natigate('/')
                                    }

                                }>{paging + idx}</button>)
                            }
                            <button onClick={
                                () => paging < listButton.length - listLength ? setPaging(paging + listLength) : setPaging(paging)
                            }>NEXT</button>
                        </ul>
                        <div style={{ textAlign: "center" }}>
                            <input type="search" /> <button>SEARCH</button>
                        </div>
                        <Routes>
                            <Route path='/:id' element={<Detail movie={movie} page={page} />} />
                        </Routes>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "50px 10px", width: "1700px", margin: "100px auto" }}>
                            {
                                movie.map((it, idx) => {
                                    return (
                                        <figure key={idx}>
                                            <Link to={`/${it.id}`}>자세히보기</Link>
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