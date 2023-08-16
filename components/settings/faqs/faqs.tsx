import { useEffect, useState } from "react"

import { IFaq, IProject, ISite, ISiteUpdates } from "@/utils/interfaces"
import { parseSiteDataFromJSON, removeItemAtIndex } from "@/utils/functions"
import HttpStatus from "@/constants/http_status"

interface FaqError {
  question: boolean
  answer: boolean
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
                  className={`px-5 py-2 outline-none border rounded w-full mb-4 ${
                    errors[index] ? "border-neutral-red" : "border-gray-300"
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
                <label className='font-sm text-gray-600 px-2' htmlFor='company'>
                  Answer<span className='text-dark-red'>*</span>
                </label>
                <textarea
                  className='px-5 py-2 outline-none border border-gray-300 rounded w-full mb-2 resize-none'
                  rows={4}
                  placeholder='Project Description eg. This is my awesome project. It does awesome things.'
                  value={value.answer}
                  onChange={(e) => {
                    const _faqs = [...faqs]
                    _faqs[index].answer = e.target.value
                    setFaqs(_faqs)
                  }}
                />

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
              disabled={!valuesChanged}
              className='rounded-full border-2 border-primary text-primary px-4 py-2 font-medium bg-white disabled:border-primary-light disabled:text-primary-light sm:font-normal sm:text-sm sm:border-1'
            >
              Discard Changes
            </button>
            <button
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
