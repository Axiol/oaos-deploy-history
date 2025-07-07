import History from "@/components/history";
import { deploysFormatter } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function fetchDeploys() {
  const urls = [
    "site=eq.actus&env=eq.PRD&limit=6&order=id.desc",
    "site=eq.actus&env=eq.UAT&limit=6&order=id.desc",
    "site=eq.actus&env=eq.U1AT&limit=6&order=id.desc",
    "site=eq.actus&env=eq.U2AT&limit=6&order=id.desc",
    "site=eq.actus&env=eq.U3AT&limit=6&order=id.desc",
  ];

  const responses = await Promise.all(
    urls.map((url) =>
      fetch(`${process.env.SUPABASE_BASE_URL}/Deploy?${url}`, {
        headers: {
          apikey: process.env.SUPABASE_ANON_KEY ?? "",
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
      }),
    ),
  );

  const data = await Promise.all(responses.map((response) => response.json()));

  return data;
}

const Home = async () => {
  const multipleDeploys = await fetchDeploys();
  console.log("Multiple Deploys:", multipleDeploys);

  const deploys = await fetch(`${process.env.SUPABASE_BASE_URL}/Deploy`, {
    headers: {
      apikey: process.env.SUPABASE_ANON_KEY ?? "",
      Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
    },
  }).then((res) => res.json());

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Deployment History
      </h1>
      <History title="Actus" deploys={deploysFormatter(deploys)} />
    </div>
  );
};

export default Home;
