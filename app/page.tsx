import History from "@/components/history";
import { deploysFormatter } from "@/lib/utils";

export const dynamic = "force-dynamic";

const Home = async () => {
  const deploys = await fetch(`${process.env.SUPABASE_BASE_URL}/Deploy`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
  }).then((res) => res.json());

  return <History deploys={deploysFormatter(deploys)} />;
};

export default Home;
