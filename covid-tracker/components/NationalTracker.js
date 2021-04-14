import 'bulma/css/bulma.css'
import Link from "next/link"


export default function TotalCount({cases,deaths}){
    

    return(
        <>
            <nav className="navbar">
                <div className="container">
                    <div id="navMenu" className="navbar-menu">
                            
                            {/* LEFT SIDE OF NAVBAR */}
                            <div className="navbar-start">
                                {/* Total Cases */}
                                <p className="navbar-item">
                                    <strong  style={{marginRight:'5px'}}>Cases: </strong> {cases}
                                </p>
                                
                                {/* Total Deaths */}
                                <p className="navbar-item"> 
                                    <strong style={{marginRight:'5px'}}>Deaths:</strong> {deaths}
                                </p>
                            </div>
                            

                            {/* RIGHT SIDE OF NAVBAR */}
                            <div className="navbar-end">
                                <div className="navbar-item">

                                    <Link href="http://localhost:3000/">
                                        <p className="is-size-5 appName">COVID-19 TRACKER</p>
                                    </Link>

                                    <div className="buttons">
                                        <a className="button is-dark" href="https://github.com/andypineda" target="_blank">Github</a>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </nav>
        </>
    )
}