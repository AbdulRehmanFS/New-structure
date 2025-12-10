import { ButtonComponent, TableComponent } from "component/index";
import { ViewerAction } from "page/style";
import { useState } from "react";
import { Line } from "recharts";
import { theme } from "util/theme";
import { ListingWrapper } from "./pushNotificationlisting";
import SearchField from "component/fields/searchField";

const Automationlisting=()=>{
    const handleSearch=()=>{
    }
    const [listing,setlisting]=useState([]);
    setlisting
    const Automationlist=[
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
         

        },
    
        {
            title: "Audience",
            dataIndex: "audience",
            key: "audience",
            align: "center",
          
        },
    
        {
            title: "Action",
            key: "action",
            align: "center",
          
            render: ( ) => (
              <ViewerAction>
                <div  className="action-icon" aria-hidden>
                  View
                </div>
                <Line height="16px" borderColor={theme.grey2} />
                <div
                  className="action-icon"
               
                  aria-hidden>
                  Delete
                </div>
                <Line height="16px" borderColor={theme.grey2} />
                <div
                  className="action-icon"
                 
                  aria-hidden>
                  Archive
                </div>
              </ViewerAction>
            )
          }

    ]
    return(
        <ListingWrapper>
        <div className="search">
          <SearchField handleSearch={handleSearch} size="middle" placeholder="Search Auto notifications" />
          <ButtonComponent text=" Create Auto Notification" bg={theme.primaryColor} width="200px" />
        </div>
        <TableComponent data={listing}   columns={Automationlist}  />
      </ListingWrapper>

    )
}


export default Automationlisting;