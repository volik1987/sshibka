# slice_kings.py sheet.png outdir prefix — лист 3×3 поз на зелёном фоне → kf_<prefix>_<0..8>.png одного размера, ноги на одной линии
import sys,numpy as np
from PIL import Image
from scipy import ndimage
src,out,pre=sys.argv[1:4];im=np.asarray(Image.open(src).convert('RGB')).astype(np.int16)
H,W,_=im.shape;ch,cw=H//3,W//3;cells=[]
for i in range(9):
    r,c=divmod(i,3);a=im[r*ch:(r+1)*ch,c*cw:(c+1)*cw]
    R,G,B=a[...,0],a[...,1],a[...,2];k=G-np.maximum(R,B)
    al=np.clip(255-(k-25)*6,0,255).astype(np.uint8)          # мягкий хромакей
    rgb=a.copy();sp=G>np.maximum(R,B);rgb[...,1]=np.where(sp,np.maximum(R,B),G) # убрать зелёный ореол
    m=al>40;lab,n=ndimage.label(m);sz=ndimage.sum(m,lab,range(1,n+1))
    keep=np.isin(lab,[j+1 for j,s in enumerate(sz) if s>800]);al=np.where(ndimage.binary_dilation(keep,iterations=2),al,0).astype(np.uint8)
    ys,xs=np.nonzero(al>40);cells.append((np.dstack([rgb.astype(np.uint8),al]),xs.min(),xs.max(),ys.min(),ys.max()))
# общий кадр: ширина/высота по максимуму, низ по нижней точке (ноги), центр по середине
w=max(x1-x0 for _,x0,x1,_,_ in cells)+20;h=max(y1-y0 for _,_,_,y0,y1 in cells)+20
for i,(a,x0,x1,y0,y1) in enumerate(cells):
    fr=Image.new('RGBA',(w,h));cx=(x0+x1)//2;fr.paste(Image.fromarray(a).crop((x0,y0,x1+1,y1+1)),(w//2-(cx-x0),h-10-(y1-y0+1)))
    s=300/h;fr.resize((round(w*s),300),Image.LANCZOS).save(f'{out}/kf_{pre}_{i}.png',optimize=True)
print(pre,w,h)
