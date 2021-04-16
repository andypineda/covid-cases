import Head from 'next/head'
import { useEffect, useState } from 'react'
import TotalCount from '../components/NationalTracker'
import FilterResults from '../lib/filter'
import 'bulma/css/bulma.css'
import getConfig from 'next/config';



export default function SearchResults({table,cases,deaths}){

    // Assign headers and data from dataframe 
    let columns = table['columns']
    let data = table['data']
    console.log(data)


    return(
        <>
        <Head>
            <title>COVID-19 Tracker</title>

            {/*  Load Bar  */}
            <script src='nprogress.js'></script>
            <link rel='stylesheet' href='nprogress.css'/>
        </Head>

        <TotalCount cases={cases} deaths={deaths} />

        <section className="hero is-link is-fullheight-witd-navbar">
        
            <div className="hero-body centered" style={{height:"auto", minHeight:"1000px"}}>
                <div id="results box" style={{width:'800px'}}>


                    <table class="table is-striped is-fullwidth is-hoverable is-bordered">
                        <thead>
                            <tr>
                                {columns.map(name =>{
                                    if(name != "date"){
                                        return(
                                            <th className="capitalize">{name}</th>
                                        )
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 && 
                                data.map(row =>{
                                    
                                    if(row[1] != "Unknown"){ 
                                        return(
                                            <>
                                            <tr>
                                                {/* State */}
                                                <td>{row[0]}</td> 
    
                                                {/* County */}
                                                <td>{row[1]}</td>
    
                                                {/* Zipcode */}
                                                <td>{row[2]}</td>
    
                                                {/* Cases */}
                                                <td>{row[3]}</td>
    
                                                {/* Deaths */}
                                                <td>{row[4]}</td>
    
                                            </tr>
                                            </>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </section>
        </>
    )
}








export async function getServerSideProps({context,query}) {

      
    // Get Search Query 
    const userInput = query.search
    const type = query.type 
    
    // Create API url 
    let url = new URL('http://127.0.0.1:5000/api/search')
    url.search = new URLSearchParams({
        search: userInput,
        type: type
    })

    // Get Table Data 
    const getData = await fetch(url)
    const table = await getData.json()

    console.log('Pandas Table',table)

    // Fetch the national case and death count from the API
    const getNationalStats = await fetch("http://127.0.0.1:5000/api/nationalstats")
    const stats = await getNationalStats.json()
    
  
    // Assign cases and deaths to its own variable 
    const cases = stats['TotalCases']
    const deaths = stats['TotalDeaths']





    return {
      props: {
        cases:cases,
        deaths:deaths,
        table:table,
      }, // will be passed to the page component as props
    }
  }
  