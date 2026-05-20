import { getSingleTileData } from "@/actions/getTilesData";
import Image from "next/image";

const SingleTilesPage = async ({ params }) => {
  const { tilesId } = await params;
  const tiles = await getSingleTileData(tilesId);

  return (
    <div>
      <h2>Tiles {tiles.title}</h2>
      <Image
        src={tiles.image}
        alt={tiles.title}
        width={250}
        height={200}
      ></Image>
    </div>
  );
};

export default SingleTilesPage;
