import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import API from "../../../../Config/API";

const ColumnsTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;
  const [getallmedsData, setGetallmedsData] = useState();

  useEffect(() => {
    API.post("/admin/getallmeds", { offset: 100 })
      .then((res) => {
        setGetallmedsData(res.data);
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Partners Table
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  SRNo.
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Medicine Name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Medicine Company
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Medicine Price
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Medicine Image
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Medicine Description
                </div>
              </th>
              <th className="border-b border-gray-200 pr-8 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {getallmedsData &&
              getallmedsData.map((items, index) => {
                return (
                  <tr key={index}>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {index + 1}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {items.medicineName}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {items.medicineCompany}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {items.medicinePrice}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        image count is {items.medicineImage.length}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {items.medicineDescription}
                      </p>
                    </td>
                    <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                      <button
                        className="linear mt-2  w-60p rounded-xl border-2 bg-[#014d4d]  py-[10px] text-base font-medium text-white transition duration-200 hover:border-[#014d4d] hover:bg-white hover:text-[#014d4d]
          active:bg-[#014d4d]"
                      >
                        <p className="text-sm font-bold text-white dark:text-white">
                          View
                        </p>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
