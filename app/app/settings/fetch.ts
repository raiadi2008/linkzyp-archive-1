import HttpStatus from "@/constants/http_status"

async function getUserInfo() {
  const res = await fetch(`/api/site`, {
    method: "GET",
  })

  if (res.ok && res.status === HttpStatus.SUCCESS) {
    const data = await res.json()
    return data
  } else {
    return null
  }
}

export default getUserInfo
