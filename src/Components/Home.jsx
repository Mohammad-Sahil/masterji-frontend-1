import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Metadata from "./Metadata";

const Home = () => {
    const Navigate = useNavigate()
    useEffect(() => {
      Navigate('/admin')
    }, [])
    
    return ( 
    <>
    <Metadata title='Admin | Masterji'/>
        <br /><br />
        <center><a href="/admin"><button className="btn btn-primary">Admin</button></a></center>
    </> 
    );
}
 
export default Home;