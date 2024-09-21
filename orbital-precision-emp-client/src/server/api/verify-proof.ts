import { type IVerifyResponse, verifyCloudProof } from "@worldcoin/idkit";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { proof, signal } = req.body;
  const app_id = process.env.NEXT_PUBLIC_WORLDID_APP_ID;
  const action = process.env.NEXT_PUBLIC_WORLDCOIN_ACTION;
  const verifyRes = (await verifyCloudProof(
    proof,
    app_id as `app_${string}`,
    action as string,
    signal
  )) as IVerifyResponse;

  if (verifyRes.success) {
    // TODO: backend logic to handle successful verification
    // Add verification status to user
    res.status(200).send(verifyRes);
  } else {
    // no changes
    res.status(400).send(verifyRes);
  }
}
