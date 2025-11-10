'use client';

import { PlusOutlined } from '@ant-design/icons';
import IconLoader from '@src/components/IconLoader/IconLoader';
import { Upload, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { memo, useState } from 'react';

// interface ProfileFormValues {
//   profileImage?: UploadFile;
// }
// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default memo(function UploadLogo() {
  // const [form] = Form.useForm<ProfileFormValues>();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<UploadFile>();

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', // Mock API endpoint
    headers: {
      authorization: 'authorization-text',
    },
    maxCount: 1,
    listType: 'picture-card',
    onChange(info) {
      setProfileImage(info.fileList && info.fileList[info.fileList.length - 1]);
    },
    onPreview: async (file: UploadFile) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as any);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    },
  };

  const uploadButton = (
    <button type="button">
      {loading ? <IconLoader showLoader={loading} /> : <PlusOutlined />}
      <div>Upload</div>
    </button>
  );

  console.log('====== ', profileImage);

  return (
    <ImgCrop rotationSlider>
      <Upload {...uploadProps}> {profileImage ? null : uploadButton}</Upload>
    </ImgCrop>
  );
});
