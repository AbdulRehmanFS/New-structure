import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "@layouts/Header";
import EarningsHeader from "../components/EarningsHeader";
import EventsEarnings from "../components/EventsEarnings";
import BucksEarnings from "../components/BucksEarnings";

export default function Earnings() {
  const [searchText, setSearchText] = useState("");
  const { earning } = useSelector((e) => e.userManagement);

  const handleSearchData = (searchData) => {
    setSearchText(searchData);
  };

  return (
    <>
      <Header handleSearchData={handleSearchData} heading="Earnings" />
      <div className="scroll-without-header">
        <EarningsHeader />
        {earning === "events" ? (
          <EventsEarnings searchText={searchText} />
        ) : (
          <BucksEarnings searchText={searchText} />
        )}
      </div>
    </>
  );
}
