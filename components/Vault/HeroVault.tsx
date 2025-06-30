'use client'

import { vaultsProps } from '@/utils/props'
import { useAccount } from 'wagmi'
import { useEffect, useRef, useState } from 'react'
import { Coins, Loader2, LockKeyhole, TrendingUp, Gift, X, Star, StarOff, ExternalLink, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '../ui/use-toast'
import { writeContract } from '@wagmi/core'
import { config } from '@/utils/config'
import { HodlCoinAbi } from '@/utils/contracts/HodlCoin'
import { ERC20Abi } from '@/utils/contracts/ERC20'
import { useMatrixEffect } from '../hooks/useMatrixEffect'
import { useFavorites } from '@/utils/favorites'
import { Badge } from '../ui/badge'

export default function HeroVault({
  vault,
  priceHodl,
  reserve,
  supply,
}: {
  vault: vaultsProps | null
  priceHodl: any
  reserve: any
  supply: any
}) {
  const [isRewardPopupVisible, setIsRewardPopupVisible] = useState(false)
  const [rewardAmount, setRewardAmount] = useState<number>(0)
  const popupRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const matrixRef = useMatrixEffect(0.15, 2)

  const account = useAccount()
  const { isFavorite, toggleFavorite } = useFavorites()

  // Initialize favorite status when component loads
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (vault?.vaultAddress && vault?.chainId && account.address) {
        try {
          const favoriteStatus = await isFavorite(vault.vaultAddress, vault.chainId, account.address)
          setIsFavorited(favoriteStatus)
        } catch (error) {
          console.error('Error checking favorite status:', error)
          setIsFavorited(false)
        }
      } else {
        setIsFavorited(false)
      }
    }

    checkFavoriteStatus()
  }, [vault?.vaultAddress, vault?.chainId, account.address, isFavorite])

  const validateInputs = () => {
    if (!vault?.vaultAddress || !vault?.coinAddress) {
      toast({
        title: 'Error',
        description: 'Vault addresses not properly initialized',
      })
      return false
    }

    if (!account.address) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet',
      })
      return false
    }

    if (rewardAmount === null || rewardAmount <= 0) {
      toast({
        title: 'Amount Invalid',
        description: 'Please input a valid amount',
      })
      return false
    }

    return true
  }

  const formatAmount = (amount: number) => {
    try {
      const decimals = vault?.decimals ?? 18;
      return BigInt(Math.floor(amount * 10 ** decimals))
    } catch (error) {
      console.error('Error formatting amount:', error)
      toast({
        title: 'Error',
        description: 'Error formatting amount',
      })
      return null
    }
  }

  const handleRewardSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      if (!validateInputs()) {
        setIsLoading(false)
        return
      }

      const formattedAmount = formatAmount(rewardAmount)
      if (!formattedAmount) {
        setIsLoading(false)
        return
      }
      const tx = await writeContract(config as any, {
        abi: HodlCoinAbi,
        address: vault?.vaultAddress as `0x${string}`,
        functionName: 'transfer',
        args: [
          vault?.vaultAddress as `0x${string}`,
          formattedAmount,
        ],
        account: account.address as `0x${string}`,
      })

      toast({
        title: 'Reward Sent',
        description: 'Your reward has been successfully transferred',
      })

      setRewardAmount(0)
      setIsRewardPopupVisible(false)
    } catch (error) {
      console.error('Transaction error:', error)
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClosePopup = () => {
    if (!isLoading) {
      setIsRewardPopupVisible(false)
      setRewardAmount(0)
    }
  }

  const handleToggleFavorite = async () => {
    if (!account.address) {
      toast({
        title: 'Wallet Required',
        description: 'Please connect your wallet to add favorites',
        variant: 'destructive',
      })
      return
    }

    if (!vault) return

    try {
      setFavoriteLoading(true)
      const newState = await toggleFavorite(vault, account.address)
      setIsFavorited(newState)
      
      toast({
        title: newState ? 'Added to Favorites' : 'Removed from Favorites',
        description: newState 
          ? `${vault?.coinName} has been added to your favorites`
          : `${vault?.coinName} has been removed from your favorites`,
      })
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast({
        title: 'Error',
        description: 'Failed to update favorite status. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setFavoriteLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: 'Copied!',
        description: 'Vault address copied to clipboard',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      })
    }
  }

  const getChainName = (chainId: number) => {
    const chainNames: { [key: number]: string } = {
      1: 'Ethereum',
      534351: 'Scroll Sepolia',
      5115: 'Citrea Testnet',
      61: 'Ethereum Classic',
      2001: 'Milkomeda',
      137: 'Polygon',
      8453: 'Base',
    }
    return chainNames[chainId] || `Chain ${chainId}`
  }

  const getChainColor = (chainId: number) => {
    const chainColors: { [key: number]: string } = {
      1: 'bg-blue-400/10 text-blue-500 border-blue-400/20',
      534351: 'bg-orange-400/10 text-orange-500 border-orange-400/20',
      5115: 'bg-yellow-400/10 text-yellow-500 border-yellow-400/20',
      61: 'bg-green-400/10 text-green-500 border-green-400/20',
      2001: 'bg-purple-400/10 text-purple-500 border-purple-400/20',
      137: 'bg-violet-400/10 text-violet-500 border-violet-400/20',
      8453: 'bg-blue-400/10 text-blue-500 border-blue-400/20',
    }
    return chainColors[chainId] || 'bg-gray-400/10 text-gray-500 border-gray-400/20'
  }

  const getBlockExplorerUrl = (chainId: number, address: string) => {
    const explorers: { [key: number]: string } = {
      1: 'https://etherscan.io',
      534351: 'https://sepolia.scrollscan.com',
      5115: 'https://explorer.testnet.citrea.xyz',
      61: 'https://blockscout.com/etc/mainnet',
      2001: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com',
      137: 'https://polygonscan.com',
      8453: 'https://basescan.org',
    }
    const baseUrl = explorers[chainId] || 'https://etherscan.io'
    return `${baseUrl}/address/${address}`
  }

  return (
    <main className='relative container mx-auto p-4 overflow-hidden'>
      {/* Matrix background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div ref={matrixRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gray-400/10 dark:bg-violet-500/8 rounded-full blur-2xl animate-pulse animation-delay-2000" />
      </div>

      <div className='relative'>
        <Card className='bg-background/50 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/5 hover:border-primary/30 transition-all duration-300'>
          <CardHeader className="pb-4">
            <div className='flex justify-between items-center'>
              <CardTitle className='font-extrabold tracking-tight text-gradient text-xl flex items-center gap-2'>
                <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                Vault Overview
              </CardTitle>
              <div className="flex items-center gap-3">
                {/* Star Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleFavorite}
                  disabled={favoriteLoading}
                  className="relative overflow-hidden group border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                  title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {favoriteLoading ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                    ) : isFavorited ? (
                      <>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">Favorited</span>
                      </>
                    ) : (
                      <>
                        <StarOff className="h-4 w-4" />
                        <span className="text-sm">Add to Favorites</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                
                <Button
                  className='relative overflow-hidden group bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary 
                    transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 font-semibold text-sm px-4 py-2'
                  onClick={() => setIsRewardPopupVisible(true)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Reward Stakers
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='bg-background/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4 transition-all duration-300 hover:border-primary/40 hover:bg-background/40 group'>
                <div className='flex items-center gap-2 text-muted-foreground font-medium mb-2 group-hover:text-primary transition-colors duration-300'>
                  <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
                    <Coins className='h-4 w-4 text-primary' />
                  </div>
                  Price per Token
                </div>
                <div className='text-2xl font-mono font-bold text-gradient'>
                  {priceHodl} {vault?.coinSymbol}
                </div>
              </div>
              
              <div className='bg-background/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4 transition-all duration-300 hover:border-primary/40 hover:bg-background/40 group'>
                <div className='flex items-center gap-2 text-muted-foreground font-medium mb-2 group-hover:text-primary transition-colors duration-300'>
                  <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
                    <LockKeyhole className='h-4 w-4 text-primary' />
                  </div>
                  Total Value Locked
                </div>
                <div className='text-2xl font-mono font-bold text-gradient'>
                  {reserve} {vault?.coinSymbol}
                </div>
              </div>
              
              <div className='bg-background/30 backdrop-blur-sm border border-primary/20 rounded-xl p-4 transition-all duration-300 hover:border-primary/40 hover:bg-background/40 group'>
                <div className='flex items-center gap-2 text-muted-foreground font-medium mb-2 group-hover:text-primary transition-colors duration-300'>
                  <div className="p-1.5 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
                    <TrendingUp className='h-4 w-4 text-primary' />
                  </div>
                  Total Supply
                </div>
                <div className='text-2xl font-mono font-bold text-gradient'>
                  {supply} h{vault?.coinSymbol}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isRewardPopupVisible && (
          <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div
              ref={popupRef}
              className='bg-background/95 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 w-full max-w-md shadow-2xl shadow-primary/10 animate-in fade-in-0 zoom-in-95 duration-300'
            >
              <div className='flex justify-between items-center mb-6'>
                <h3 className='text-2xl font-extrabold tracking-tight text-gradient flex items-center gap-3'>
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  Reward Stakers
                </h3>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleClosePopup}
                  disabled={isLoading}
                  className="hover:bg-muted/50 rounded-full"
                  aria-label='Close reward popup'
                >
                  <X className='h-5 w-5' />
                </Button>
              </div>
              
              <div className='space-y-6'>
                <div className='space-y-3'>
                  <div className='text-sm font-semibold text-foreground flex items-center gap-2'>
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Reward Amount
                  </div>
                  <div className='relative'>
                    <Input
                      id='reward-amount'
                      type='number'
                      value={rewardAmount}
                      onChange={e => {
                        const value = parseFloat(e.target.value)
                        setRewardAmount(value)
                      }}
                      placeholder='Enter amount'
                      className='bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary/60 
                        transition-all duration-300 hover:border-primary/50 text-foreground pr-16'
                      disabled={isLoading}
                      min={0}
                      step='any'
                    />
                    <span className='absolute inset-y-0 right-4 flex items-center text-muted-foreground font-mono text-sm'>
                      {vault?.coinSymbol}
                    </span>
                  </div>
                </div>

                {isLoading ? (
                  <Button
                    className='w-full bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed'
                    disabled
                  >
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing...
                  </Button>
                ) : (
                  <Button
                    className='w-full bg-gradient-to-r from-primary to-purple-600 hover:from-purple-600 hover:to-primary 
                      transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25 
                      text-primary-foreground font-semibold'
                    onClick={handleRewardSubmit}
                  >
                    Send Reward
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}