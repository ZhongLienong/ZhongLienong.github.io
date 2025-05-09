import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
const filePath = './visitors.json';

async function getVisitors() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.visitors || 0;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with initial value
      await fs.writeFile(filePath, JSON.stringify({ visitors: 0 }), 'utf-8');
      return 0;
    }
    console.error("Failed to read visitors:", error);
    return 0;
  }
}

async function incrementVisitors() {
  let visitors = await getVisitors();
  visitors++;
  await fs.writeFile(filePath, JSON.stringify({ visitors }), 'utf-8');
  return visitors;
}

export async function GET() {
  const visitors = await incrementVisitors();
  return NextResponse.json({ visitors });
}
