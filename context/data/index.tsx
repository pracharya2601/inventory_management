import { useReducer, useState } from "react";
import { dataReducer, initialState } from "./dataReducer";
import { initializeState, addData, addSingleData, deleteSingleData } from "./dataAction";
import { datacontext } from "./datacontext";
import { useRouter } from "next/router";


const DataProvider = ({ children }) => {
  const [data, setData] = useState({});
  // const [state, dispatch] = useReducer(dataReducer, initialState);
  const router = useRouter();
  const id = router.query.id as string[];
  const asPath = router.asPath.split('?');
  const cachedKey = id && encodeURIComponent(asPath[0]);
  const companyId = id && id[0];
  const position = id && id[1];
  const dataType = id && id[2];
  const page = id && id[3] || 1;


  // const stateInitialize = (data): void => {
  //   dispatch(initializeState(data))
  // }
  // const addDataList = (companyId, dataType, data, pageNumber): void => {
  //   dispatch(addData(companyId, dataType, data, pageNumber))
  // }
  // const addOrUpdateSingleData = (companyId, dataType, data): void => {
  //   dispatch(addSingleData(companyId, dataType, data))
  // }
  // const deleteData = (companyId, dataType, dataId): void => {
  //   dispatch(deleteSingleData(companyId, dataType, dataId))
  // }
  const addDataList = (dataId, passedData) => {
    console.log("this is runnin inside context")
    if (data[dataId]) {
      return;
    }
    let newData = data;
    newData[`${dataId}`] = passedData;
    setData(newData);
  }

  return (
    <datacontext.Provider
      value={{
        data,
        // stateInitialize,
        addDataList,
        // addOrUpdateSingleData,
        // deleteData,
      }}
    >
      {children}
    </datacontext.Provider>
  )
}

export default DataProvider;
