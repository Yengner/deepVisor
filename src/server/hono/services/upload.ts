import { S3Client, PutObjectCommand, DeleteObjectCommand, } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const bucket = process.env.CLOUDFLARE_BUCKET_NAME!;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID!;
const accessKeyId = process.env.CLOUDFLARE_ACCESS_KEY_ID!;
const accessSecret = process.env.CLOUDFLARE_SECRET_KEY!;
const publicURL = process.env.CLOUDFLARE_BUCKET_PUBLIC_URL!;

const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

const client = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accountId,
    accessKeyId,
    secretAccessKey: accessSecret,
  }
});

export const uploadFile = async (file: File) => {
  const fileName = randomUUID();
  const fileExtension = file.name.split('.').pop();

  const generatedFileName = `${fileName}.${fileExtension}`

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: generatedFileName,
    ContentType: `image/${fileExtension}`,
    Body: Buffer.from(await file.arrayBuffer()),
    ACL: 'public-read'
  });

  await client.send(command);

  const url = `${publicURL}/${generatedFileName}`;
  return url;
}

export const isUploadedFile = (url: string) => {
  return url.startsWith(publicURL);
}

export const deleteFile = async (url: string) => {
  const key = url.split('/').pop()!;

  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key
  });

  await client.send(command);
}