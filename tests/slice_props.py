# Нарезка листа 2×2 предметов на белом фоне: python slice_props.py лист.png папка имя1 имя2 имя3 имя4 (пусто = пропустить)
import sys,os,numpy as np
from PIL import Image,ImageFilter
from scipy import ndimage as nd
im=Image.open(sys.argv[1]).convert('RGB');out=sys.argv[2];names=sys.argv[3:7]
a=np.asarray(im).astype(int);H,W=a.shape[:2]
for q,n in enumerate(names):
    if n=='-':continue
    r,c=divmod(q,2);sub=a[r*H//2:(r+1)*H//2,c*W//2:(c+1)*W//2]
    white=sub.min(2)>238;lab,_=nd.label(white)
    border=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    fg=~np.isin(lab,list(border))
    # мягкий край для свечения: прозрачность по «небелизне»
    soft=np.clip((255-sub.min(2))/60,0,1);al=np.maximum(fg*1.0,soft)
    A=Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1))
    o=Image.fromarray(sub.astype(np.uint8)).convert('RGBA');o.putalpha(A)
    ys,xs=np.where(al>.05);o=o.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1))
    o.thumbnail((256,256),Image.LANCZOS);o.save(os.path.join(out,n+'.png'),optimize=True);print(n,o.size)
