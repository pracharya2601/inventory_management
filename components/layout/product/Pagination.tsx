import Button from "@/components/elements/Button";
import { useRouter } from "next/router"

const Pagination = ({ count, limit }: { count: number; limit: number }) => {
  const router = useRouter();
  const { businessId, productType, page } = router.query;
  return (
    <>
      <div className='text-left text-sm text-yellow-500 md:text-right pr-0 pl-4 md:pr-4 md:pl-0 mt-10'>Total {productType} count: {count}</div>
      <div className="w-full flex items-center justify-center md:justify-end pr-0 md:pr-4 gap-2 mt-2 mb-5">
        <Button
          color="purple"
          onClick={() => {
            router.push(`/${businessId}/${productType}/${+page - 1}`)
          }}
          disabled={page === '1' ? true : false}
          label={<span className="hidden md:block">Prev</span>}
          size='sm'
          icon={<svg xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>}
        />
        <span className='ml-2'>Page</span>
        <span className='px-4 py-2 bg-gray-700 rounded-md'>{page}</span>
        <span className='mr-2'> of <span className="font-bold text-lg ml-1"> {count / limit} </span></span>

        <Button
          color="purple"
          iconSide="right"
          size='sm'
          label={<span className="hidden md:block">Next</span>}
          onClick={() => {
            router.push(`/${businessId}/${productType}/${+page + 1}`)
          }}
          disabled={page === count.toString() ? true : false}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>}
        />
      </div>
    </>
  )
}

export default Pagination;