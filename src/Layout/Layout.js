import styled from "styled-components";
import Contract from "../Contract/Contract";

const Text=styled.div`
    width:100%;
    padding:16px;    
    display:flex;
`;


function Layout(){
    return(
        <Text>
            <Contract></Contract>
        </Text>
    )
}

export default Layout