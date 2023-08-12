import { useEffect, useState } from "react"

import { ICertificate, ISite, ISiteUpdates } from "@/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/utils/functions"
import HttpStatus from "@/constants/http_status"

interface CertificateError {
  name: boolean
  authority: boolean
}

function compareCertificates(a: ICertificate[], b: ICertificate[]): boolean {
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].name !== b[i].name ||
      a[i].authority !== b[i].authority ||
      a[i].url !== b[i].url
    )
      return true
  }
  return false
}

export default function Certificates({
  siteInfo,
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
  valuesChanged,
}: ISiteUpdates) {
  const [certificates, setCertificates] = useState<ICertificate[]>(
    siteInfo.certificates!.map((value) => {
      return {
        name: value.name,
        authority: value.authority,
        url: value.url,
      }
    })
  )
  const [errors, setErrors] = useState<CertificateError[]>(
    siteInfo.certificates!.map((value) => {
      return {
        name: false,
        authority: false,
      }
    })
  )

  function validateInputs() {
    const _errors: CertificateError[] = certificates.map((value) => {
      return {
        name: !value.name || value.name.length === 0,
        authority: !value.authority || value.authority.length === 0,
      }
    })
    setErrors(_errors)
  }

  function discardCertificateChanges() {
    setCertificates(
      siteInfo.certificates!.map((value) => {
        return {
          name: value.name,
          authority: value.authority,
          url: value.url,
        }
      })
    )
    setValuesChanged(false)
  }

  async function saveCertificateChanges() {
    validateInputs()

    for (let err of errors) {
      if (err.name || err.authority) {
        return
      }
    }
    setIsLoading(true)
    const res = await fetch("/api/site/certificates", {
      method: "PUT",
      body: JSON.stringify(certificates),
    })
    if (res.ok && res.status === HttpStatus.SUCCESS) {
      const data = await res.json()
      const parsedData = parseSiteDataFromJSON(data)
      setSiteInfo(parsedData)
      setValuesChanged(false)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    validateInputs()
    if (compareCertificates(certificates, siteInfo.certificates!)) {
      setValuesChanged(true)
    } else setValuesChanged(false)
  }, [certificates])

  return (
    <>
      <section className='mx-auto max-w-website py-6 h-full mb-32'>
        <div className='max-w-medium-website'>
          {certificates.map((value, index) => {
            return (
              <div key={index} className='my-12 relative pb-14'>
                <input
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
                  type='text'
                  placeholder='Certificate Title eg. Chartered Accountant Diploma tier-1'
                  value={value.name}
                  onChange={(e) => {
                    const edu = [...certificates]
                    edu[index].name = e.target.value
                    setCertificates(edu)
                  }}
                />
                <input
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
                  type='text'
                  placeholder='Issued by eg. Chartered Accountant Association USA'
                  value={value.authority}
                  onChange={(e) => {
                    const edu = [...certificates]
                    edu[index].authority = e.target.value
                    setCertificates(edu)
                  }}
                />
                <input
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
                  type='text'
                  placeholder='Url of the certificate eg. https://bit.ly/tech-cert'
                  value={value.url}
                  onChange={(e) => {
                    const edu = [...certificates]
                    edu[index].url = e.target.value
                    setCertificates(edu)
                  }}
                />

                <button
                  className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
                  onClick={() => {
                    const edu = [...certificates]
                    removeItemAtIndex(edu, index)
                    setCertificates(edu)
                  }}
                >
                  remove certificates
                </button>
              </div>
            )
          })}
          <button
            className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
            onClick={() => {
              const edu = [...certificates]
              edu.push({ name: "", authority: "", url: "" } as ICertificate)
              setCertificates(edu)
            }}
          >
            + Add Another Certificate
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 w-screen bg-white -shadow-2xl'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-8 flex gap-x-6 justify-end'>
            <button
              onClick={discardCertificateChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light'
            >
              Discard Changes
            </button>
            <button
              onClick={saveCertificateChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
