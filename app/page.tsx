import History from "@/components/history";
import { getDeploys } from "@/lib/deploys";

export const dynamic = "force-dynamic";

const Home = async () => {
  const deploys = await getDeploys();

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Deployment History
      </h1>
      <History deploys={deploys} />
    </div>
  );
};

export default Home;
