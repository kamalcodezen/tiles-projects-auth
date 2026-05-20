import { getAllTilesData } from "@/actions/getTilesData";
import Image from "next/image";
import Link from "next/link";

const AllTilesProducts = async () => {
  const allTiles = await getAllTilesData();
  return (
    <div>
      <h2>All Tiles</h2>
      <div className="grid grid-cols-4 gap-5">
        {allTiles.map((tiles) => {
          return (
            <Link key={tiles.id} href={`/allProducts/${tiles.id}`}>
              <Image
                src={tiles.image}
                width={300}
                height={150}
                alt={tiles.title}
              ></Image>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllTilesProducts;
