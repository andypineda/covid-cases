import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import TotalCount from '../components/NationalTracker'
import FilterResults from '../lib/filter'

import 'bulma/css/bulma.css'
import Link from 'next/link'





export default function Home({cases,deaths}) {

  // Assign Filtered results by category 
  let [states, setStates] = useState()
  let [county,setCounty] = useState()
  let [zip,setZip] = useState()

  // Assign types
  const countyType = "county"
  const stateType = "state"
  const zipType = "zip"


  //Router to redirect user to pages 
	const router = useRouter()
  
  // Gets tde live query input of tde user in tde searchbar 

  function PassInput(){
    
    // Quick fix to use tde document 
    useEffect(()=> {
  
      // Selects tde input field from tde search bar 
      let SearchInput = document.querySelector('input');
      
      //Gets tde live time input 
      SearchInput.oninput = handleInput;
      
      //Runs tdis function witd each input 
      async function handleInput(e) {
        
        //Get tde current value
        const value = e.target.value
        console.log('Input is',value)
  
        //Do a search for current input if tde value is not empty
        if(value.length > 3){

          // Make a request to get tde filtered results from tde API 
          const results = await FilterResults(value)

          // Assign each search result to it's assigned state 
          setCounty(results['County'])
          setStates(results['States'])
          setZip(results['Zip'])


          console.log(results['Zip'])

        } else {
          setCounty(undefined)
          setStates(undefined)
          setZip(undefined)
        }
  
      }
    })
  }
  


  // Search
  // Take the user selection and search for results 
  function Search(data,type){

    router.push({ pathname: 'http://localhost:3000/search', query: { search: data, type:type }})
  }








  


  return (
    <>
      <TotalCount cases={cases} deaths={deaths} />

      <section className="hero is-link is-fullheight-witd-navbar">
        
        <div className="hero-body centered" style={{height:"1000px"}}>
          
          <div className="box">

            <div className="has-text-centered introMessage">
              <p className="title has-text-black has-text-centered">
                Search COVID-19 cases by City, State or ZipCode 
              </p>
            </div>

            {/* Search Bar */}
            <div className="searchBarContainer">
              <div className="field">
                <div className="control">
                  <input className="input is-large" type="search" placeholder="ex. 17109" autoFocus onInput={PassInput()} />
                </div>
              </div>
            </div>

            {/* Filtered Results */}
            <div className="filter">


              {/*  STATES */}
              { states != undefined && 

                <div id="states" className="block">
                  <p>States</p>

                  <div>
                    <table class="table is-striped is-hoverable">
                      <tbody>

                        {/* Display State results */}
                        { states.length > 0 && 
                          states.map((state) =>{
                            console.log(state)
                            return(
                              <>
                              <tr>
                                <button className=" button is-ghost" onClick={()=>{Search(state, stateType)}}>
                                  <td>{state}</td>
                                </button>
                              </tr>
                              </>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>

                </div>

              }

              

              {/*  COUNTY */}
              { county != undefined && 

              <div id="county" className="block">
                <p>County</p>

                <div>
                  <table class="table is-striped is-hoverable">
                    <tbody>

                      {/* Display County results */}
                      { county.length > 0 && 
                        county.map((location) =>{
          
                          return(
                            <>
                            <tr>
                              {/* Create a button link for each result */}
                              <button className=" button is-ghost" onClick={()=>{Search(location[1],countyType)}}>
                                <td>{`${location[1]}, ${location[0]}`}</td>
                              </button>
                            </tr>
                            </>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

              </div>

              }




             {/*  ZIPCODE */}
             { zip != undefined && 

              <div id="zipcode" className="block">
                <p>ZipCode</p>

                <div>
                  <table class="table is-striped is-hoverable">
                    <tbody>

                      {/* Display State results */}
                      {
                        zip.map((location) =>{
                          
                          return(
                            <>
                            <tr>
                              <button className=" button is-ghost" onClick={()=>{Search(location,zipType)}}>
                                <td>{`${location}`}</td>
                              </button>
                            </tr>
                            </>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>

              </div>

              }
            </div>


          </div>
        </div>

      </section>   
    </>
  )
}





export async function getStaticProps(context) {

  // Fetch the national case and death count from the API
  const getNationalStats = await fetch("http://127.0.0.1:5000/api/nationalstats")
  const stats = await getNationalStats.json()


  // Assign cases and deaths to its own variable 
  const cases = stats['TotalCases']
  const deaths = stats['TotalDeaths']

  
  
  return {
    props: {
      cases:cases,
      deaths:deaths
    }, // will be passed to the page component as props
  }
}
