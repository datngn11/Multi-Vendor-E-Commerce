import configPromise from "@payload-config";
import { getPayload } from "payload";

const HomePage = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return (
    <div className="flex flex-col gap-8 font-[family-name:var(--font-dm-sans)]">
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </div>
  );
};

export default HomePage;
