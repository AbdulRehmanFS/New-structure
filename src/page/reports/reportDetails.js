
import Header from "component/header";
import styled from "styled-components"
import BackButton from "util/commonSection";
import ReportInfoCard from "./reportInfoCard";
import Reportcomment from "./reportcomment";
import { useLocation } from "react-router-dom";
import CopyWrite from "./copyright";
import Content from "./content";



export default function ReportDetails() {
  const {state}=useLocation()
 
  return (
    <>
     <Header showSearch={false} heading="Reports" />
     <ReportDetailsWrapper>
        <div className='back'>
            <BackButton/>
            <p>User Reports</p>
        </div>
        <div className="details">
        <ReportInfoCard data={state}/>
       {state?.type==2 && <Reportcomment data={state}/>}
       {state?.type==4 && <CopyWrite data={state}/>}
       {state?.type==5 && <Content data={state}/>}
        </div>
        
      

     </ReportDetailsWrapper>
    </>
  )
}

const ReportDetailsWrapper=styled.div`
.back{
display:flex;
gap:10px;
font-size:20px;
}
.details{
padding:25px;
}

`


