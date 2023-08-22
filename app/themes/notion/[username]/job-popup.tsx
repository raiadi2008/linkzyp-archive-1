"use client"

import { useState } from "react"
import Image from "next/image"

import officeBuilding from "@/public/icons/office-building.png"

interface IJobPopup {
  logo?: string
  title: string
  starts_at?: Date | null
  ends_at?: Date | null
  subTitle: string
  content?: string
  company?: string
}

export default function JobPopup({
  subTitle,
  content,
  logo,
  title,
  company,
  starts_at,
  ends_at,
}: IJobPopup) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        onClick={() => setVisible(false)}
        className={`z-50 h-screen w-screen bg-black bg-opacity-90 fixed top-0 left-0 ${
          visible ? "visible" : "hidden"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className='bg-white px-12 py-6 max-w-lg rounded-lg mx-auto mt-32 max-h-96 overflow-scroll no-scrollbar relative'
        >
          <div className='flex items-center gap-x-8 mb-8'>
            <Image src={logo ?? officeBuilding} alt='' width={60} height={60} />
            <div>
              <p className='font-medium'>{title}</p>
              <p className='text-gray-600'>{company}</p>
              <p className='text-gray-600 text-sm mt-1'>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                }).format(starts_at!)}{" "}
                -{" "}
                {ends_at
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                    }).format(ends_at)
                  : "Present"}
              </p>
            </div>
          </div>
          <h2 className='text-lg font-semibold mb-5 text-black'>{subTitle}</h2>
          <p className='text-gray-700 text-sm'>{content}</p>
          <div className='mt-5 flex justify-end'>
            <button
              onClick={() => setVisible(false)}
              className=' border-black rounded border py-3 px-6'
            >
              close
            </button>
          </div>
        </div>
      </div>
      <button
        className='font-light text-gray-700'
        onClick={() => {
          setVisible(!visible)
        }}
      >
        read more &gt;&gt;
      </button>
    </>
  )
}
