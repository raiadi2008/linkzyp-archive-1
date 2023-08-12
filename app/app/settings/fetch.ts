import HttpStatus from "@/constants/http_status"

async function getUserInfo() {
  const res = await fetch(`/api/site/settings`, {
    method: "GET",
  })
  if (res.ok && res.status === HttpStatus.SUCCESS) {
    const data = await res.json()
    return data
  }
  throw Error("Error fetching site info")
}

export default getUserInfo
