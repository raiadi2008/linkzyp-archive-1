import { useEffect, useState } from "react"

import { ICertificate, ISite, ISiteUpdates } from "@/app/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/app/utils/functions"
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificates])

  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium'>
          {certificates.map((certificate, index) => {
            return (
              <div key={index} className='my-12 relative pb-14'>
                <label className='font-sm text-gray-600 px-2'>
                  Certifiacte Title<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border  rounded w-full mb-4 ${
                    errors[index]?.name ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='Certificate Title eg. Chartered Accountant Diploma tier-1'
                  value={certificate.name}
                  onChange={(e) => {
                    const _certificates = [...certificates]
                    _certificates[index].name = e.target.value
                    setCertificates(_certificates)
                  }}
                />
                <label className='font-sm text-gray-600 px-2'>
                  Issued by<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border  rounded w-full mb-4 ${
                    errors[index]?.authority ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='Issued by eg. Chartered Accountant Association USA'
                  value={certificate.authority}
                  onChange={(e) => {
                    const _certificates = [...certificates]
                    _certificates[index].authority = e.target.value
                    setCertificates(_certificates)
                  }}
                />
                <label className='font-sm text-gray-600 px-2'>
                  Certifiacate URL
                </label>
                <input
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2'
                  type='text'
                  placeholder='Url of the certificate eg. https://bit.ly/tech-cert'
                  value={certificate.url}
                  onChange={(e) => {
                    const _certificates = [...certificates]
                    _certificates[index].url = e.target.value
                    setCertificates(_certificates)
                  }}
                />

                <button
                  className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
                  onClick={() => {
                    const _certificates = [...certificates]
                    removeItemAtIndex(_certificates, index)
                    setCertificates(_certificates)
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
              const _certificates = [...certificates]
              _certificates.push({
                name: "",
                authority: "",
                url: "",
              } as ICertificate)
              setCertificates(_certificates)
            }}
          >
            + Add Another Certificate
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium py-6 flex gap-x-6 justify-end'>
            <button
              onClick={discardCertificateChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveCertificateChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary bg-primary text-white px-4 py-2 font-medium disabled:border-primary-light disabled:bg-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
