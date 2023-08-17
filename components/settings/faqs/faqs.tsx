import { use, useEffect, useState } from "react"

import { IFaq, IProject, ISite, ISiteUpdates } from "@/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/utils/functions"
import HttpStatus from "@/constants/http_status"

interface FaqError {
  question: boolean
  answer: boolean
}

function compareFAQs(a: IFaq[], b: IFaq[]) {
  if (a.length !== b.length) return true
  for (let i = 0; i < a.length; i++) {
    if (a[i].question !== b[i].question || a[i].answer !== b[i].answer)
      return true
  }
  return false
}

export default function FAQs({
  siteInfo,
  setIsLoading,
  setSiteInfo,
  setValuesChanged,
  valuesChanged,
}: ISiteUpdates) {
  const [faqs, setFaqs] = useState<IFaq[]>(
    siteInfo.faqs!.map((val, index) => {
      return {
        question: val.question,
        answer: val.answer,
      } as IFaq
    })
  )
  const [errors, setErrors] = useState<FaqError[]>(
    siteInfo.faqs!.map((value) => {
      return {
        question: false,
        answer: false,
      }
    })
  )

  useEffect(() => {
    if (compareFAQs(faqs, siteInfo.faqs!)) {
      setValuesChanged(true)
    } else {
      setValuesChanged(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqs])

  function validateChanges() {
    const _errors = faqs.map((value) => {
      return {
        answer: !value.answer || value.answer.length === 0,
        question: !value.question || value.question.length === 0,
      } as FaqError
    })
    setErrors(_errors)
  }

  function discardChanges() {
    setFaqs(
      siteInfo.faqs!.map((value, index) => {
        return {
          question: value.question,
          answer: value.answer,
        } as IFaq
      })
    )
  }

  async function saveChanges() {
    validateChanges()
    for (let ee of errors) {
      if (ee.question || ee.answer) {
        return
      }
    }
    setIsLoading(true)
    const res = await fetch("/api/site/faqs", {
      method: "PUT",
      body: JSON.stringify(faqs),
    })
    if (res.ok && res.status === HttpStatus.SUCCESS) {
      const data = await res.json()
      const parsedData = parseSiteDataFromJSON(data)
      setSiteInfo(parsedData)
      setValuesChanged(false)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section className='mx-auto max-w-website py-6 mb-32 px-6'>
        <div className='max-w-medium-website'>
          {faqs.map((value, index) => {
            return (
              <div key={index} className='my-12 relative pb-14'>
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Question<span className='text-dark-red'>*</span>
                </label>
                <input
                  className={`px-5 py-2 outline-none border rounded w-full  ${
                    errors[index]?.question ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  type='text'
                  placeholder='Project Title eg. My Awesome Project'
                  value={value.question}
                  onChange={(e) => {
                    const _faqs = [...faqs]
                    _faqs[index].question = e.target.value
                    setFaqs(_faqs)
                  }}
                />
                {(errors[index]?.question ?? false) && (
                  <p className='text-xs font-extralight text-dark-red'>
                    question cannot be empty
                  </p>
                )}
                <label
                  className='block font-sm text-gray-600 px-2 mt-4'
                  htmlFor='company'
                >
                  Answer<span className='text-dark-red'>*</span>
                </label>
                <textarea
                  className={`px-5 py-2 outline-none border rounded w-full resize-none ${
                    errors[index]?.answer ?? false
                      ? "border-neutral-red"
                      : "border-gray-300"
                  }`}
                  rows={4}
                  placeholder='Project Description eg. This is my awesome project. It does awesome things.'
                  value={value.answer}
                  onChange={(e) => {
                    const _faqs = [...faqs]
                    _faqs[index].answer = e.target.value
                    setFaqs(_faqs)
                  }}
                />
                {(errors[index]?.answer ?? false) && (
                  <p className='text-xs font-extralight text-dark-red'>
                    answer cannot be empty
                  </p>
                )}

                <button
                  className='absolute bottom-2 right-0 text-dark-red border rounded p-2 border-neutral-red'
                  onClick={() => {
                    const _faqs = [...faqs]
                    removeItemAtIndex(_faqs, index)
                    setFaqs(_faqs)
                  }}
                >
                  remove FAQ
                </button>
              </div>
            )
          })}
          <button
            className='px-5 py-2 border border-gray-300 rounded w-full mb-2 resize-none'
            onClick={() => {
              const _faqs = [...faqs]
              _faqs.push({
                question: "",
                answer: "",
              } as IFaq)
              setFaqs(_faqs)
            }}
          >
            + Add Another FAQ
          </button>
        </div>
      </section>
      <section className='fixed bottom-0 left-0 w-screen bg-white -shadow-2xl px-6'>
        <div className='max-w-website mx-auto'>
          <div className=' max-w-medium-website py-6 flex gap-x-6 justify-end'>
            <button
              onClick={discardChanges}
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
              onClick={saveChanges}
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
