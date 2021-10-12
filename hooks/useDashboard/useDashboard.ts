import { useRouter } from "next/router";
import { datacontext } from "@context/data/datacontext";
import { useContext, useState, useEffect } from "react";


export const useDashboard = () => {
  // const [productData, setData] = useState(propsData.productList);
  const router = useRouter()
  const id = router.query.id as string[];
  const companyId = id && id[0];
  const position = id && id[1];
  const dataType = id && id[2];
  const page = id && id[3] || 1;

  useEffect(() => {
    //realtime data fetching from here
    return () => {
      //cleanup data here
    }
  }, [])
  const routeChange = (url: string) => {
    router.push(url)
  }

  return {
    isDataFetched: companyId && position && dataType && page,
    position,
    page,
    companyId,
    dataType,
    routeChange,
  }
}

