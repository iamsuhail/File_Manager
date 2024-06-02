import React from 'react';
import { Col } from 'react-bootstrap';
import CreateFile from '../../CreateFile/index.jsx';
import CreateFolder from '../../CreateFolder/index.jsx';
import UploadFile from '../../UploadFile/index.jsx';
import BreadCrum from '../BreadCrum.js/index.jsx';
import DeleteFolder from '../../DeleteFolder/index.jsx';
import DeleteFile from '../../DeleteFile/index.jsx';

const SubNav = ({ currentFolder, docIds, fileIds }) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', width: "15rem", height: "100vh", borderRadius: '0.5rem'}}>
    <Col
      md={12} // Adjust the width of the sidebar as per your design
      className={'d-flex flex-column px-3 pt-3 mt-3 '} >
        
      {currentFolder && currentFolder !== 'root folder' ? (
        <>
          <BreadCrum currentFolder={currentFolder} />
          {currentFolder.data.createdBy !== 'admin' && (
            <div className="mt-auto">
              <CreateFolder currentFolder={currentFolder} />
              <DeleteFolder currentFolder={currentFolder} docIds={docIds} />
              <UploadFile currentFolder={currentFolder} />
              <CreateFile currentFolder={currentFolder} />
              <DeleteFile currentFolder={currentFolder} fileIds={fileIds} />

            </div>
          )}
        </>
      ) : (
        <>
          <p>Root</p>
          <div className="mt-3">
            <CreateFolder currentFolder={currentFolder} />
            <DeleteFolder currentFolder={currentFolder} docIds={docIds} />
            <UploadFile currentFolder={currentFolder} />
            <CreateFile currentFolder={currentFolder} />
            <DeleteFile currentFolder={currentFolder} fileIds={fileIds} />

          </div>
        </>
      )}
    </Col>
  </div>
  );
};

export default SubNav;