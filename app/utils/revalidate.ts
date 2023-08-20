export async function revalidatePortfolioData(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/site?tag=${username}&username=${username}`,
    { method: "GET" }
  )
  return res.ok
}
