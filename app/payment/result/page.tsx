'use server'
import PaymentResultPage from "../../components/clientResultPage/clientResultPage";
import { connection } from 'next/server'
export default async function page(){
  await connection();
  return <PaymentResultPage  />;
}