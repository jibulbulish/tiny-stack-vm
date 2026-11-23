import{mkdirSync as a,readdirSync as b,readFileSync as c,writeFileSync as d}from'node:fs';
const T=`"3c&(,-1!!!!!!!!def++++'ghi'jkl!mno!!!!!!!!!!!!!BFFB"!!!!!!!!!!!'*!!!!!!!!!!!!!!&&#&`;
const G=[(h,y)=>h+y|0,(h,y)=>h-y|0,(h,y)=>Math.imul(h,y),(h,y)=>h&y,(h,y)=>h|y,(h,y)=>h^y,(h,y)=>h<<y,(h,y)=>h>>y,(h,y)=>h>>>y|0,(h,y)=>h==y|0,(h,y)=>h<y|0,(h,y)=>h>>>0<y>>>0|0];
function run(p,q){
 const D=[],C=[],M=new Int32Array(256),o=Buffer.alloc(65536),R=i=>p.readInt16LE(i);
 let s=0,k=0,pc=0,st=0,ip=0,ol=0;
 const e=t=>({o:o.slice(0,ol),e:t});
 for(;;){
  if(++st>1e6)return e(10);
  if(pc<0||pc>=p.length)return e(9);
  const x=p[pc],t=T.charCodeAt(x)-33,u=t>66?9:t-1,m=u>>4;
  if(!t)return e(5);
  if(pc+m>=p.length)return e(9);
  const nx=pc+1+m,w=(u>>2)&3,j=u&3;
  if(s<w||s-w+j>256)return e(s<w?2:3);
  pc=nx;
  if(x<8){
   if(x<3){if(!x)return e(0);D[s++]=x==1?p.readInt8(nx-1):p.readInt32LE(nx-4);}
   else if(x==3)s--;
   else if(x==4||x==6){D[s]=D[s-1-(x==6)];s++;}
   else if(x==5)[D[s-1],D[s-2]]=[D[s-2],D[s-1]];
   else [D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];
  }
  else if(x<35){
   if(x==23||x==27)D[s-1]=x==23?-D[s-1]|0:~D[s-1];
   else{
    const y=D[s-1],h=D[s-2];
    if(x>18&&x<23){if(!y)return e(4);D[s-2]=[(h/y)|0,h%y|0,((h>>>0)/(y>>>0))|0,(h>>>0)%(y>>>0)|0][x-19];}
    else D[s-2]=G[t-67](h,y);
    s--;
   }
  }
  else if(x<53){
   if(x==48)pc+=R(nx-2);
   else if(x<51){const v=D[--s];if((x==49)==!v)pc+=R(nx-2);}
   else if(x==51){if(k==64)return e(7);C[k++]=nx;pc=R(nx-2)&65535;}
   else{if(k==0)return e(8);pc=C[--k];}
  }
  else if(x<66){
   const ad=D[s-1];
   if(ad&~255)return e(6);
   x==64?D[s-1]=M[ad]:(M[ad]=D[s-2],s-=2);
  }
  else if(x==80){const g=''+D[s-1];if(ol+g.length>65536)return e(11);s--;ol+=o.write(g,ol);}
  else if(x==81){if(ol>=65536)return e(11);o[ol++]=D[--s]&255;}
  else if(x==82)D[s++]=ip<q.length?q[ip++]:-1;
  else return e(D[--s]&255);
 }
}
const E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O=E.MAKEFUN_OUTPUT_DIR||'/output';
for(const n of b(I)){
 const P=I+'/'+n,Q=O+'/'+n,r=run(c(P+'/program.bin'),c(P+'/input.bin'));
 a(Q,{recursive:true});
 d(Q+'/stdout.bin',r.o);
 d(Q+'/exit.txt',r.e+'\n');
}
