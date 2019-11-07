
import React,{useState} from 'react'
import qnUpload from '@/common/upload'
import { Icon, message } from 'antd'
import './uploadimg.scss'

const UploadImg = ({ img, setImg, index })=>{
    const [loading,setLoading] = useState(false);
    const imgChange = e =>{
        setLoading(true);
        qnUpload(e.file||e.target.files[0]).then(ret => {
            setLoading(false);
            setImg(ret.domain_name + ret.key);
            // setImg('http://image.futurestudio.pro/' + ret.key);
        }, err => {
            setLoading(false);
            message.error(err.message,2);
        });
    }

    return <div styleName="img-block">
        <div styleName="img">
            {/* {img?<div style={{ backgroundImage: 'url('+img+')' }} />:<UploadButton loading={loading}/>} */}
            {img?<img src={img} />:<div> <Icon type={ loading ? 'loading' : 'plus'} /> </div>}
            <input type="file" onChange={imgChange}/>
        </div>
        <div>
            <p>商品主图{ index }</p>
            <p>图片尺寸 1200*1200以内</p>
            <p>图片大小：不能大于2M</p>
            <p>图片格式：jpg、png、gif</p>
        </div>
    </div>
}

export default UploadImg