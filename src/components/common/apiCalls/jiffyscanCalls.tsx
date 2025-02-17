import axios from 'axios';

export interface UserOp {
    id: string
    transactionHash: string
    userOpHash: string
    sender: string
    paymaster: string
    nonce: number
    actualGasCost: number
    actualGasPrice: number
    actualGasUsed: number
    success: Boolean
    revertReason: string
    blockTime: number
    blockNumber: number
    network: String
    input: string
    target: string
    callData: string
    beneficiary: string
    factory: string
    value: number
}

export interface Bundle {
    userOpsLength: number
    transactionHash: string
    network: string
    blockNumber: number
    timestamp: number
    userOps: UserOp[]
} 

export interface DailyMetric {
    userOpCounter: number
    walletsCreated: number
    bundleCounter: number
    totalFeeCollected: number
    daySinceEpoch: number
}

export interface GlobalCounts {
    userOpCounter: number
    id: number
    walletsCreated: number
    bundleCounter: number
}

export const getLatestUserOps = async (selectedNetwork: string, pageSize: number, pageNo: number): Promise<UserOp[]>  => {
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getLatestUserOps?network=' + selectedNetwork + '&first=' + pageSize + '&skip=' + pageNo * pageSize
    );
    const data = await response.json();
    if ('userOp' in data) {
        return data.userOps as UserOp[];
    }
    return [] as UserOp[];
}

export const getLatestBundles = async (selectedNetwork: string, pageSize: number, pageNo: number): Promise<UserOp[]>  => {
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/getLatestBundles?network=' + selectedNetwork + '&first=' + pageSize + '&skip=' + pageNo * pageSize
    );
    const data = await response.json();
    if ('userOp' in data) {
        return data.userOps as UserOp[];
    }
    return [] as UserOp[];
}

export const getDailyMetrics = async (selectedNetwork: string, noOfDays: number): Promise<any> => {
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/GetDailyMetrics?network=' + selectedNetwork + '&noOfDays=4'
      );
      const data = await response.json();
      if ('metrics' in data) {
        return data.metrics as DailyMetric[];
      }
      return [] as DailyMetric[];
}

export const getGlobalMetrics = async (selectedNetwork: string): Promise<GlobalCounts> => {
    const response = await fetch(
        'https://api.jiffyscan.xyz/v0/GetGlobalCounts?network=' + selectedNetwork
      );
      const data = await response.json();
      if ('metrics' in data) {
        return data.metrics as GlobalCounts;
      }
      return {} as GlobalCounts;
}