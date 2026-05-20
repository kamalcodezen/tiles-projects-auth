import Image from "next/image";
import AllTilesProducts from "./allProducts/page";
import { getFilterTilesData } from "@/actions/getTilesData";

export default async function Home() {
  // const filterData = await getFilterTilesData("White")
  // console.log(filterData)
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <AllTilesProducts />

    </div>
  );
}
