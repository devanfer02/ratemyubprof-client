"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from "next/navigation"

type PaginationProps = {
  meta: PaginationMeta
  path: string
}

export function PaginationUI({ meta }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    return `${pathname}?${params.toString()}`
  }

  return (
    <Pagination className="my-5 text-ub-secondary">
      <PaginationContent>
        {meta.current > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={buildPageHref(meta.prev)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={buildPageHref(meta.prev)}>{meta.prev}</PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {meta.current}
          </PaginationLink>
        </PaginationItem>
        {meta.current < meta.totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={buildPageHref(meta.next)}>{meta.next}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={buildPageHref(meta.next)}/>
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
