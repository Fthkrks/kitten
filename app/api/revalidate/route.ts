import {timingSafeEqual} from 'node:crypto';
import {revalidatePath,revalidateTag} from 'next/cache';
export async function POST(request:Request){
 const expected=process.env.REVALIDATE_SECRET,supplied=request.headers.get('authorization')?.replace(/^Bearer /,'');
 if(!expected||!supplied||Buffer.byteLength(expected)!==Buffer.byteLength(supplied)||!timingSafeEqual(Buffer.from(expected),Buffer.from(supplied)))return Response.json({error:'Unauthorized'},{status:401});
 revalidateTag('cms',{expire:0});revalidatePath('/','layout');
 return Response.json({revalidated:true});
}
