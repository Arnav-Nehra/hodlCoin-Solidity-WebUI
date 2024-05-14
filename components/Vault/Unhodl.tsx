'use client'

import { vaultsProps } from '@/utils/props'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { StylishButton } from '../StylishButton'
import { useAccount } from 'wagmi'
import { HodlCoinAbi } from '@/utils/contracts/HodlCoin'
import { writeContract } from '@wagmi/core'
import { config } from '@/utils/config'

export default function UnholdBox({
  id,
  vault,
  hodlCoinBalance,
  getBalances
}: {
  id: number | string
  vault: vaultsProps | null
  hodlCoinBalance: number
  getBalances: Function
}) {
  const { toast } = useToast()

  const [loadingUnhold, setLoadingUnhold] = useState<boolean>(false)
  const [unholdAmount, setUnholdAmount] = useState<number | null>(null)

  const account = useAccount();


  // const conversion = (amount: number) => {
  //   return amount * (1 + (vault?.rate ?? 0))
  // }

  const unholdAction = async () => {
    try {
      setLoadingUnhold(true)
      if (unholdAmount === null || unholdAmount <= 0) {
        toast({
          title: 'Amount Null',
          description: 'Please input a valid amount',
        })
        setLoadingUnhold(false)
        return
      }

      const tx = await writeContract(config as any, {
        abi: HodlCoinAbi,
        // @ts-ignore
        address: vault?.address as string,
        functionName: 'unhodl',
        args: [BigInt(unholdAmount * 10**18)],
        account: account?.address as '0x${string}'
      });

      await getBalances()

      toast({
        title: 'Unhold Done',
        description: 'Your unhold has been successfully completed',
      })
      console.log('unhold', unholdAmount)
      setLoadingUnhold(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: String(error),
      })
      console.error(error)
    }
  }

  return (
    <div className='flex-1 shadow-xl overflow-hidden border-secondary border-[1px] p-12'>
      <div className='flex flex-col space-y-4'>
        <h1 className='text-2xl font-bold pb-6'>Unhold</h1>
        <Input
          type='number'
          placeholder='Amount'
          className='w-full'
          value={unholdAmount !== null ? unholdAmount.toString() : ''}
          onChange={e => setUnholdAmount(Number(e.target.value))}
        />
        <div className='flex flex-row space-x-2 px-2 pb-4 text-sm text-primary'>
          <p
          style={{  cursor: 'pointer'}}
          onClick={() => setUnholdAmount(Number(hodlCoinBalance))}
          >{Number(hodlCoinBalance).toString()}</p>
          <p>{vault?.name}</p>
        </div>
        {loadingUnhold ? (
          <Button className='w-full' disabled>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Please wait
          </Button>
        ) : (
          <StylishButton buttonCall={unholdAction}>unhodl</StylishButton>
        )}
      </div>
    </div>
  )
}
