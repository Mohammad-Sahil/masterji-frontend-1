import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const Navigate = useNavigate()
    useEffect(() => {
      Navigate('/admin')
    }, [])
    
    return ( 
    <>
        <br /><br />
        <center><a href="/admin"><button className="btn btn-primary">Admin</button></a></center>
    </> 
    );
}
 
export default Home;