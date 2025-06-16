'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card } from '../ui/card'
import { useMatrixEffect } from '../hooks/useMatrixEffect'

export function About() {
  const matrixRef = useMatrixEffect(0.25, 3) // Reduced opacity and symbol count

  return (
    <section className="relative w-full py-24 overflow-hidden bg-background">
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-25">
        <div ref={matrixRef} className="absolute inset-0 w-full h-full" />
        
        {/* Additional purple glow effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-violet-500/15 rounded-full blur-2xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-fuchsia-500/10 rounded-full blur-xl animate-pulse animation-delay-4000" />
        
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 space-y-24">
        {/* How it Works Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient">
              How it Works
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-500 dark:from-purple-400 dark:to-fuchsia-500 rounded-full mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              HodlCoin creates a win-win ecosystem for both vault creators and stakers through innovative incentive mechanisms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Vault Creators */}
            <Card className="p-8 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gradient">For Vault Creators</h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Efficient Distribution</h4>
                      <p className="text-sm text-muted-foreground">Distribute rewards to thousands of holders with a single transaction</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Build Community</h4>
                      <p className="text-sm text-muted-foreground">Create dedicated vaults for specific tokens or communities</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Earn Unstaking Fees</h4>
                      <p className="text-sm text-muted-foreground">Receive a portion of fees when users unstake early, creating passive income</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Universal Use Cases</h4>
                      <p className="text-sm text-muted-foreground">Perfect for DAOs, projects, or any token-based reward system</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Card>

            {/* For Stakers */}
            <Card className="p-8 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gradient">For Stakers</h3>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
                </div>
                
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Earn from Others&apos; Impatience</h4>
                      <p className="text-sm text-muted-foreground">Benefit from unstaking fees paid by users who exit early</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Long-term Value Growth</h4>
                      <p className="text-sm text-muted-foreground">Hodling encourages price stability and long-term asset appreciation</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Receive Rewards</h4>
                      <p className="text-sm text-muted-foreground">Get additional rewards distributed by vault creators and other participants</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Flexible Participation</h4>
                      <p className="text-sm text-muted-foreground">Choose from various vaults with different risk profiles and reward structures</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient">
              Universal Use Cases
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-500 dark:from-purple-400 dark:to-fuchsia-500 rounded-full mx-auto" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every Web3 project and DAO needs efficient token distribution - just like companies distribute dividends to shareholders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors text-center">
              <div className="text-3xl mb-4">🏢</div>
              <h4 className="font-bold mb-2">Corporate Dividends</h4>
              <p className="text-sm text-muted-foreground">Just like companies distribute dividends to shareholders, Web3 projects need to reward token holders</p>
            </Card>
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors text-center">
              <div className="text-3xl mb-4">🏛️</div>
              <h4 className="font-bold mb-2">DAO Treasury</h4>
              <p className="text-sm text-muted-foreground">DAOs can efficiently distribute treasury funds or governance rewards to their community members</p>
            </Card>
            <Card className="p-6 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="font-bold mb-2">Project Rewards</h4>
              <p className="text-sm text-muted-foreground">Any project with a token can reward loyal holders with additional tokens or other benefits</p>
            </Card>
          </div>
        </div>


        {/* About HodlCoin Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
          {/* Paper Image */}
          <div className="w-full lg:w-1/2">
            <Card className="p-4 bg-background/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <Link
                href='https://eprint.iacr.org/2023/1029'
                target='_blank'
                className="block group"
              >
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    unoptimized
                    fetchPriority='high'
                    loading='lazy'
                    src='/images/paper.png'
                    alt='Research Paper'
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </Card>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gradient">
                About HodlCoin
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-purple-500 dark:from-purple-400 dark:to-fuchsia-500 rounded-full" />
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                HodlCoin is a staking protocol that encourages staking (&quot;hodling&quot;)
                assets for long periods of time. When hodling, users deposit coins of
                a given asset in a vault and receive a proportional amount of corresponding hodlCoins.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                When unhodling, users must pay an unstaking fee that benefits the vault&apos;s creator and users
                who continue hodling longer. Moreover, anyone (especially vault creators) can 
                distribute rewards to hodlers, to further incentivize hodling.
              </p>
            </div>

            <div className="pt-4">
              <Link 
                href='https://eprint.iacr.org/2023/1029'
                target='_blank'
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Read the Research Paper
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
