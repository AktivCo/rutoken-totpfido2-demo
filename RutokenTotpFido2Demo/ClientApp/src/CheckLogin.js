import React, {useEffect} from "react";


const CheckLogin = () => {

    useEffect(() => {
        // Update the document title using the browser API
        console.log("effect");
        document.title = `You clicked ${1} times`;
    });

}


export default CheckLogin;