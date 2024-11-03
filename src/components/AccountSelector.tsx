"use client";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Account {
  adAccountId: string;
}

interface accountInfo {
  facebook_page_id: string;
  facebook_page_name: string;
  category: string;
}

interface currentAccount {
  adAccountId: string;
  accountInfo: accountInfo[] | null;
}

interface SelectAccountProps {
  accounts: Account[];
  currentAccount: currentAccount;
}

export function SelectAccount({ accounts, currentAccount }: SelectAccountProps) {

  const router = useRouter();
  // console.log('Current Account:', currentAccount);
  const handleAccountChange = (adAccountId: string) => {
    // Update the URL with the new account ID
    router.push(`/?id=${adAccountId}`);
  };

  return (
    <Select onValueChange={handleAccountChange}>
      <SelectTrigger className="w-[200px] bg-gray-3 justify-between">
        <SelectValue placeholder={`${currentAccount.accountInfo?.[0]?.facebook_page_name || "Unknown Page"} (${currentAccount.adAccountId})`} />
      </SelectTrigger>
      <SelectContent className="bg-gray-3">
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          {accounts.map((account) => (
            <SelectItem
              key={account.adAccountId}
              value={account.adAccountId}
              className={`cursor-pointer ${currentAccount.adAccountId === account.adAccountId ? "text-primaryBlue bg-primaryBlue" : ""
                }`}
            >
              {`${currentAccount.accountInfo?.[0]?.facebook_page_name || "Unknown Page"} (${currentAccount.adAccountId})`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}