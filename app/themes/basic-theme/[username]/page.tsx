async function getUserInfo(username: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/user?username=${username}`,
    {
      next: { revalidate: 3600 },
    }
  )
  if (res.ok) {
    const data = await res.json()

    return data
  }
  return null
}

export default async function Page({
  params,
}: {
  params: { username: string }
}) {
  const data = await getUserInfo(params.username)
  return <main>Basic Theme: {data["full_name"]}</main>
}
