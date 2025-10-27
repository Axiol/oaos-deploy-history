'use server'

import client from "@/lib/redis";

async function getLastDeploys(site: string, env: string, limit = 5) {
  const currentId = await client.get(`deploy:${site}:${env}:counter`);
  
  if (!currentId) {
    return [];
  }
  
  const lastId = parseInt(currentId);
  const deploys = [];
  
  for (let i = lastId; i > Math.max(0, lastId - limit); i--) {
    const key = `deploy:${site}:${env}:${i}`;
    const data = await client.json.get(key);
    
    if (data) {
      deploys.push({
        id: i,
        ...data
      });
    }
  }
  
  return deploys;
}

export async function getDeploy() {

}
