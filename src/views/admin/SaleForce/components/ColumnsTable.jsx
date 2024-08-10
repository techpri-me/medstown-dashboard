import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

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

  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Sales Force Table
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  First name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Last Name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  medicine name
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  description
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            <tr>
              <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  demo
                </p>
              </td>
              <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  demo
                </p>
              </td>
              <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  demo
                </p>
              </td>
              <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                  demo
                </p>
              </td>
              <td className="pt-[14px] pb-[20px] sm:text-[14px]">
                <button
                  className="linear mt-2  w-40 rounded-xl border-2 bg-[#014d4d]  py-[10px] text-base font-medium text-white transition duration-200 hover:border-[#014d4d] hover:bg-white hover:text-[#014d4d]
          active:bg-[#014d4d]"
                >
                  <p className="text-sm font-bold text-white dark:text-white">
                    View Sales
                  </p>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
