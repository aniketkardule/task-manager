
import React from "react";
import { Link } from "react-router-dom";

const HomeScreen = () => {
    return (
        <div className="border border-dark">
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default HomeScreen;