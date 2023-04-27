import React from 'react'
import './MovieForm.css'

export const MovieForm = ({ setMovies }) => {

    async function addMovie(e) {
        e.preventDefault()
        const newMoviesObj = {
            title: document.getElementById('title').value,
            openingText: document.getElementById('opentext').value,
            releaseDate: document.getElementById('date').value
        }
        console.log(newMoviesObj)

        const response = await fetch('https://react-http-6d731-default-rtdb.firebaseio.com/movies.json', {
            method: 'POST',
            body: JSON.stringify(newMoviesObj),
            headers: {
                'CONTENT-TYPE': 'application/json'
            }
        })
        const data = await response.json()
        // setMovies((prevMovie) => {
        //     return [...prevMovie, {
        //         id: data.name,
        //         ...newMoviesObj
        //     }]
        // })

    }

   

    return (
        <>
            <form>
                <div className='container'>
                    <div className="form-group">
                        <label for="title">Title</label>
                        <input type="text" className="form-control" id="title" />

                    </div>

                    <div className="form-group">
                        <label for="opentext">Opening Text</label>
                        <textarea class="form-control" rows='4' id="opentext"></textarea>
                    </div>

                    <div className="form-group">
                        <label for="date">Releasing Date</label>
                        <input type="date" className="form-control" id="date" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addMovie}>Add Movie</button>
                  
                </div>
            </form>
        </>
    )
}

