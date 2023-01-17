import React, { FC } from "react";
import { Upload as AUpload, Button } from "antd";

import { UploadProps } from "../types";

const Upload: FC<UploadProps> = () => {
  return (
    <AUpload>
      <Button>上传</Button>
    </AUpload>
  );
};

export default Upload;
