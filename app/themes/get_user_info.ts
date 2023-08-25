async function getUserInfo(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/site?username=${username} `,
    { next: { revalidate: 86400, tags: [username] } }
  )
  if (res.ok) {
    const data = await res.json()

    return data
  }
  return null
}

export default getUserInfo
