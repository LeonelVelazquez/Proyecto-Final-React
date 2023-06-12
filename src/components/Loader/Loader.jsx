import './loader.css'
import React from "react";
import { DotSpinner } from '@uiball/loaders'

function Loader() {

    return (

        <div className="loader"> <DotSpinner
            size={40}
            speed={0.9}
            color="black"
        /></div>

    )

}

/*function Loader(){
    return(
        <span class="loader"></span>
    )
}*/


export default Loader