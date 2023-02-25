// import { createRoot } from 'react-dom/client' 
// const App = () => {           
//     return (                     
//         <div>                             
//             <p>Hello World!</p>            
//         </div> ) }
// const appElement = document.getElementById("app")
// const root = createRoot(appElement)
// root.render(<App />)


import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'




const App = () => {

    const [playerData, setPlayerData] = useState([]);
    useEffect(() => {

        try {

            fetchPlayerData();

        } catch (error) {

            console.log(error);
        }

    }, [])

    const [filterParam, setFilterParam] = useState("");
    useEffect(() => {

        let filteredData = playerData.filter((player) => {
            let lowercaseName = player.name.toLowerCase();
            return lowercaseName.includes(filterParam);
        });
        console.log(filteredData);
        setFilteredPlayers(filteredData);
    }, [filterParam])

    const [filteredPlayers, setFilteredPlayers] = useState([]);

    async function fetchPlayerData() {
        try {
            const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players');

            const translatedData = await response.json();

            console.log(translatedData)

            const actualPlayerData = translatedData.data.players

            setPlayerData(actualPlayerData);
            setFilteredPlayers(actualPlayerData);
        } catch (error) {

            console.log(error);
        }
    }

    async function fetchPlayerDetails(event) {
        try {
            const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-MT-WEB-FT/players/${event.target.value}`);

            const translatedData = await response.json();

            console.log(translatedData)

            const actualPlayerData = translatedData.data.player


            let playerHTML = `
            <div class="player-view">
                <div class="header">
                    <p class="pup-title">${actualPlayerData.name}</p>
                    <p class="pup-number">#${actualPlayerData.id}</p>
                </div>
                <p>Breed: ${actualPlayerData.breed}</p>
                <img src="${actualPlayerData.imageUrl}" " width="100" height="100" >
            </div>
            `
            document.getElementById(actualPlayerData.id).innerHTML += playerHTML;

        } catch (error) {

            console.log(error);
        }
    }




    return (
        <div>
            <input
                type="search"
                placeholder="Search"
                value={filterParam}
                onChange={(e) => {
                    setFilterParam(e.target.value);
                }}
            />
            <section> {
                !filteredPlayers.length ? <div>No data for this player!</div> :
                    filteredPlayers.map((singlePlayerElement) => {
                        return (
                            <div key={singlePlayerElement.id} id={singlePlayerElement.id}>
                                <p>Name: {singlePlayerElement.name}</p>
                                <button value={singlePlayerElement.id}
                                    onClick={fetchPlayerDetails}>
                                    See Details {singlePlayerElement.name}
                                </button>
                            </div>
                        )
                    })
            }
            </section>
        </div>)
}
const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)



