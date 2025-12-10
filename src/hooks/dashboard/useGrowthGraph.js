import { useEffect, useState } from "react";
import Message from "component/messages";
import { getGrowthGrapApi } from "service/api/dashboard";
import { dayTimeInterval, monthsName, weeksName } from "util/constant";
import moment from "moment";

const useGrowthGraph = () => {
  const [loading, setLoading] = useState(false);
  const [growthGraphData, setGrowthGraphData] = useState([]);
  const [createrViewer, setCreaterViewer] = useState(3);
  const [filterTime, setFilterTime] = useState(365);

  const getgrowth = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("type", filterTime);
    params.append("user_type", createrViewer);
    const res = await getGrowthGrapApi(params);

    if (res?.status === 200) {
      if (filterTime === 365) {
        const monthData = monthsName.map((el) => {
          const found = res?.data.find((element) => {
            let tempDate = moment(`01/${element?.date}`).format("DD/MM/YYYY");
            return moment(tempDate).format("MMM") === `${el}`;
          });
          return found ? { ...found, name: el } : { name: el, creater: 0, viewer: 0 };
        });
        setGrowthGraphData(monthData);
      } else if (filterTime === 30) {
        const dayTime = dayTimeInterval.map((el) => {
          const found = res?.data.find((element) => {
            let tempDate = element?.date?.split("/")?.[0];
            let date = tempDate.at(0) == 0 ? tempDate.at(1) : tempDate;
            return Number(date) === el;
          });
          return found ? { ...found, name: el } : { name: el, creater: 0, viewer: 0 };
        });
        setGrowthGraphData(dayTime);
      } else if (filterTime === 7) {
        const weeklyData = weeksName.map((el, index) => {
          const found = res.data.find((element) => element.date === index + 1);
          return found ? { ...found, name: el } : { name: el, creater: 0, viewer: 0 };
        });
        setGrowthGraphData(weeklyData);
      }
    } else {
      Message.error(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getgrowth();
  }, [createrViewer, filterTime]);

  return [growthGraphData, createrViewer, setCreaterViewer, filterTime, setFilterTime, loading];
};

export default useGrowthGraph;
