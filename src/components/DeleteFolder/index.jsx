import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addFolderUser } from "../../redux/actionCreators/filefoldersActionCreators";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteFolder = ({ currentFolder }) => {



  const handleFolderDelete = (e) => {
    // e.preventDefault();
    toast.dark(" folder Deleted Successfully!");
  };
  
  return (
    <>
  
      <Button
        onClick={() => handleFolderDelete()}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2 mt-3"
      >
        
        <FontAwesomeIcon icon={faTrash} />
        &nbsp; Delete Folder
      </Button>
    </>
  );
};

export default DeleteFolder;
