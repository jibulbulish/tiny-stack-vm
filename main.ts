import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
const T=`"3c&(,-1!!!!!!!!+++++++'+++'+++!+++!!!!!!!!!!!!!BFFB"!!!!!!!!!!!'*!!!!!!!!!!!!!!&&#&`;
const F=[(h,y)=>h+y|0,(h,y)=>h-y|0,(h,y)=>Math.imul(h,y),0,0,0,0,0,(h,y)=>h&y,(h,y)=>h|y,(h,y)=>h^y,0,(h,y)=>h<<(y&31),(h,y)=>h>>(y&31),(h,y)=>(h>>>(y&31))|0,0,(h,y)=>h===y?1:0,(h,y)=>h<y?1:0,(h,y)=>(h>>>0)<(y>>>0)?1:0];
function run(p,q){
 const D=[],C=[],M=new Int32Array(256),o=new Uint8Array(65536);
 let s=0,k=0,pc=0,st=0,ip=0,ol=0;
 const e=t=>({o:o.slice(0,ol),e:t});
 for(;;){
  if(st===1e6)return e(10);
  if(pc<0||pc>=p.length)return e(9);
  const x=p[pc],t=T.charCodeAt(x)-33;
  if(!t)return e(5);
  const u=t-1,m=u>>4;
  if(pc+m>=p.length)return e(9);
  st++;
  const nx=pc+1+m,w=(u>>2)&3,j=u&3;
  if(s<w)return e(2);
  if(s-w+j>256)return e(3);
  pc=nx;
  if(x<8){
   if(x<3){if(!x)return e(0);D[s++]=x==1?p.readInt8(nx-1):p.readInt32LE(nx-4);}
   else if(x==3)s--;
   else if(x==4||x==6){D[s]=D[s-(x==6?2:1)];s++;}
   else if(x==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
   else [D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
   continue;
  }
  if(x<35){
   if(x==23){D[s-1]=-D[s-1]|0;continue;}
   if(x==27){D[s-1]=~D[s-1];continue;}
   const y=D[s-1],h=D[s-2];
   if(x>18&&x<23){if(!y)return e(4);D[s-2]=x==19?h===-2147483648&&y===-1?h:(h/y)|0:x==20?y===-1?0:h%y|0:x==21?Math.floor((h>>>0)/(y>>>0))|0:(h>>>0)%(y>>>0)|0;}
   else D[s-2]=F[x-16](h,y);
   s--;continue;
  }
  if(x<53){
   if(x==48){pc+=p.readInt16LE(nx-2);continue;}
   if(x<51){const v=D[--s];if((x==49)===(v==0))pc+=p.readInt16LE(nx-2);continue;}
   if(x==51){if(k==64)return e(7);C[k++]=nx;pc=p[nx-2]|p[nx-1]<<8;continue;}
   if(k==0)return e(8);pc=C[--k];continue;
  }
  if(x<66){
   const ad=D[s-1];
   if(ad<0||ad>255)return e(6);
   if(x==64)D[s-1]=M[ad];else{M[ad]=D[s-2];s-=2;}
   continue;
  }
  if(x==80){const g=''+D[s-1];if(ol+g.length>65536)return e(11);s--;o.set(Buffer.from(g),ol);ol+=g.length;continue;}
  if(x==81){if(ol>=65536)return e(11);o[ol++]=D[--s]&255;continue;}
  if(x==82){D[s++]=ip<q.length?q[ip++]:-1;continue;}
  return e(D[--s]&255);
 }
}
const E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
for(const n of b(I)){
 const r=run(c(I+'/'+n+'/program.bin'),c(I+'/'+n+'/input.bin'));
 a(O+'/'+n,{recursive:true});
 d(O+'/'+n+'/stdout.bin',r.o);
 d(O+'/'+n+'/exit.txt',r.e+'\n');
}
