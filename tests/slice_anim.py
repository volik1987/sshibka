# Нарезка листа 2×2 (белый фон) на кадры u_<имя>{,_w1,_w2,_a}.png 192 px; печатает SPRK-масштабы.
# Запуск: python slice_anim.py <папка с <имя>.png> имя1 имя2 ...
import sys,os,json,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
src=sys.argv[1];names=sys.argv[2:];out=os.path.join(src,'frames');os.makedirs(out,exist_ok=True)
SUF=['','_w1','_w2','_a'];OUT=192;K={}
sheet=Image.new('RGBA',(4*130,len(names)*130),(40,60,40,255))
for ni,n in enumerate(names):
    im=Image.open(os.path.join(src,n+'.png')).convert('RGB');a=np.asarray(im).astype(int);H,W=a.shape[:2]
    white=a.min(2)>232;lab,_=nd.label(white)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(border))
    A=Image.fromarray((fg*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
    rgba=im.copy();rgba.putalpha(A);ra=np.asarray(rgba);frames=[]
    for q in range(4):
        r,c=divmod(q,2);ys=slice(r*H//2,(r+1)*H//2);xs=slice(c*W//2,(c+1)*W//2)
        m=fg[ys,xs].copy();big=nd.binary_dilation(m,iterations=10);lb,k=nd.label(big)
        if k>1:
            sz=nd.sum(m,lb,range(1,k+1));m=m&(lb==np.argmax(sz)+1)
        sub=ra[ys,xs].copy();sub[...,3]=np.where(m,sub[...,3],0)
        wh=(sub[...,:3].min(2)>244)&m;wl,wk=nd.label(wh)
        if wk:
            for i,v in enumerate(nd.sum(wh,wl,range(1,wk+1))):
                if v>350: sub[...,3]=np.where(wl==i+1,0,sub[...,3])
        body=nd.binary_erosion(m,iterations=18)
        if body.sum()<500: body=m
        cy,cx=nd.center_of_mass(body);ys_,xs_=np.where(m)
        frames.append((sub,cx,cy,max(cx-xs_.min(),xs_.max()-cx,cy-ys_.min(),ys_.max()-cy)))
    E=max(f[3] for f in frames)+6;K[n]=round(E/(frames[0][3]+6),3)
    for q,(sub,cx,cy,ext) in enumerate(frames):
        S=int(2*E);cv=Image.new('RGBA',(S,S),(0,0,0,0))
        cv.paste(Image.fromarray(sub),(int(round(E-cx)),int(round(E-cy))),Image.fromarray(sub))
        cv=cv.resize((OUT,OUT),Image.LANCZOS);cv.save(os.path.join(out,f'u_{n}{SUF[q]}.png'),optimize=True)
        sheet.alpha_composite(cv.resize((128,128)),(q*130,ni*130))
sheet.convert('RGB').save(os.path.join(src,'check.jpg'),quality=82)
print(json.dumps(K))
