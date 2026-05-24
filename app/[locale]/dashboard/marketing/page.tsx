import { MarketingSubNav } from '@/components/marketing/layout/MarketingSubNav'
import { MarketingShell } from '@/components/marketing/layout/MarketingShell'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function MarketingPage() {
  return (
    <>
      <MarketingSubNav />
      <ErrorBoundary>
        <MarketingShell />
      </ErrorBoundary>
    </>
  )
}
