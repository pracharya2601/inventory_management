import Input from "../elements/Input";
import Image from 'next/image';
import { useContext, useState, useEffect } from "react";
import { datacontext } from "@context/data/datacontext";
import { useRouter } from "next/dist/client/router";

const BusinessHeader = ({ company, position }) => {
  const router = useRouter();
  const p = parseInt(router.query.page as string);
  return (
    <div className="bg-gray-300 dark:bg-gray-800 sticky top-0 z-30 h-12 mt-1 flex justify-between items-center px-2">
      <span className="flex items-center gap-2 font-bold">
        <Image src={"/icon.png"} height={20} width={20} />
        <p>{company.workplaceName}</p>
      </span>
      <p className="capitalize" onClick={() => router.push(`/dashboard?i=6136e4ea4385b834d2e4eb2a$$p=admin&&data=product&&page=${p + 1}`)}>Position: {position}</p>
    </div>
  )
}

export default BusinessHeader;