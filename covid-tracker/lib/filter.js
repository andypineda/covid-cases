
export default async function FilterResults(query){

    // Creates the API url with Query parms 
    let url = new URL('http://127.0.0.1:5000/api/filter')
    url.search = new URLSearchParams({
        search: query
    })

    console.log('filter url:',url)

    // Calls the filter api to get filtred search results 
    const results = await fetch(url)
    .then(function(response) {
        return response.json()
    })
    .catch(function (error){
        console.warn('Something went wrong filtering results', error)
    })

    return results

    
}