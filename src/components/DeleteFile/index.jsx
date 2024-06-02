import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
import { removeFile } from "../../redux/actionCreators/filefoldersActionCreators";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteFile = ({ currentFolder,fileIds}) => {
  const dispatch = useDispatch();



  const handleFileDelete = () => {
    // e.preventDefault();
    // console.log(docIds);
    fileIds.map((fileId) => {
      dispatch(removeFile(fileId));
    });
    // toast.dark(" Folder(s) Deleted Successfully!");
  };
  
  return (
    <>
  
      <Button
        onClick={() => handleFileDelete()}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2 mt-3"
      >
        
        <FontAwesomeIcon icon={faTrash} />
        &nbsp; Delete File
      </Button>
    </>
  );
};

export default DeleteFile;