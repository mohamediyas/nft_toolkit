import React, { useState, useMemo, useCallback, useContext } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button, Input } from "../components";
import { useDropzone } from "react-dropzone";
import images from "../assets";

const CreateNft = () => {
  const [fileUrl, setfileUrl] = useState(null);

  const [form, setform] = useState({
    price: "",
    name: "",
    description: "",
  });
  const { theme } = useTheme();

  // useCallback memorized value
  const onDrop = useCallback(() => {
    // upload image to blockchain
  }, []);

  console.log(form);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  // usememo memorized function

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed 
      ${isDragActive && "border-file-active"}
      ${isDragAccept && "border-file-accept"}
      ${isDragReject && "border-file-reject"}
      
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
          Create New NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload Files
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG,GIF,SVG,WEBM, max 100mb.{" "}
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="upload"
                    className={theme == "light" && "filter invert"}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Save drag and drop file.
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device.
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="aset image" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="input"
          title="Name"
          placeHolder="NFT Name"
          handleClick={(e) => setform({ ...form, name: e.target.value })}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeHolder="NFT Description"
          handleClick={(e) => setform({ ...form, description: e.target.value })}
        />
        <Input
          inputType="number"
          title="Price"
          placeHolder="NFT Price"
          handleClick={(e) => setform({ ...form, price: e.target.value })}
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Create Nft"}
            classStyle={"rounded-xl"}
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNft;
