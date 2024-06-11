import {
  faFileImage,
  faFileAlt,
  faFileAudio,
  faFileVideo,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getAdminFiles,
  getAdminFolders,
  getUserFiles,
  getUserFolders,
} from '../../../redux/actionCreators/filefoldersActionCreators.js';
import SubNav from '../SubNav.js/index.jsx';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [it, setIt] = React.useState([]);
  const [it2, setIt2] = React.useState([]);
  const { isLoading, adminFolders, allUserFolders, allUserFiles } = // add userID
    useSelector(
      (state) => ({
        isLoading: state.filefolders.isLoading,
        adminFolders: state.filefolders.adminFolders,
        allUserFolders: state.filefolders.userFolders,
        allUserFiles: state.filefolders.userFiles,
        // userId: state.auth.userId,
      }),
      shallowEqual
    );

  const userFolders =
    allUserFolders 
    // allUserFolders.filter((folder) => folder.data.parent === '');

  const createdUserFiles =
    allUserFiles &&
    allUserFiles.filter(
      (file) => file.data.parent === '' && file.data.url === ''
    );
  const uploadedUserFiles =
    allUserFiles &&
    allUserFiles.filter(
      (file) => file.data.folderId == 0 
    );

    const adddocIds = (docId) => {
      setIt([...it, docId]);
    }
    const deletedocIds = (docId) => {
      setIt(it.filter(x=>x!==docId));
    }
    const addfileIds = (docId) => {
      setIt2([...it2, docId]);
    }
    const deletefileIds = (docId) => {
      setIt2(it2.filter(x=>x!==docId));
    }
  useEffect(() => {
    if (isLoading && !adminFolders) {
      dispatch(getAdminFolders());
      dispatch(getAdminFiles());
    }
    if (!userFolders) {
      dispatch(getUserFiles());
      dispatch(getUserFolders(0));
    }
  }, [dispatch, isLoading]);

  if (isLoading) {
    return (
      <Row>
        <Col md="12">
          <h1 className="text-center my-5">Fetching folders...</h1>
        </Col>
      </Row>
    );
  }

  return (
    <>
    <Row>
      {/* Sidebar */}
      <Col md={2}>
        <SubNav currentFolder="root folder" docIds={it} fileIds={it2}/>
      </Col>
      {/* {adminFolders && adminFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Admin Folders</p>
          <Row style={{ height: '150px' }} className="pt-2 pb-4 px-5">
            {adminFolders.map(({ data, docId }) => (
              <Col
                onDoubleClick={() =>
                  history.push(/dashboard/folder/admin/${docId})
                }
                onClick={(e) => {
                  if (e.currentTarget.classList.contains('text-white')) {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.classList.remove('text-white');
                    e.currentTarget.classList.remove('shadow-sm');
                  } else {
                    e.currentTarget.style.background = '#017bf562';
                    e.currentTarget.classList.add('text-white');
                    e.currentTarget.classList.add('shadow-sm');
                  }
                }}
                key={docId}
                md={2}
                className="border h-100  d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="mt-3"
                  style={{ fontSize: '3rem', color: "#FFD43B" }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )} */}
      <Col md={9}>
      {userFolders && userFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Folders</p>
          <Row style={{ height: 'auto' }} className="pt-2 gap-2 pb-4 px-5">
            {userFolders.map(({ data, docId }) => (
              <Col
                onClick={(e) => {
                  if (e.currentTarget.classList.contains('text-white')) {
                    deletedocIds(docId);
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.classList.remove('text-white');
                  } else {
                    if(e.detail === 1) adddocIds(docId);
                    e.currentTarget.style.background = 'black';
                    e.currentTarget.classList.add('text-white');
                  }
                }}
                onDoubleClick={() => history.push(`/dashboard/folder/${docId}`)}
                key={docId}
                md={2}
                className="border h-50 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="mt-3"
                  style={{ fontSize: '3rem', color: "#FFD43B" }}
                />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {createdUserFiles && createdUserFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Created Files</p>
          <Row md='2' style={{ height: 'auto' }} className="pt-2 gap-2 pb-4 px-5">
            {createdUserFiles.map(({ data, docId }) => (
              <Col
              onDoubleClick={() => history.push(`/dashboard/file/${docId}`)}
                onClick={(e) => {
                  if (e.currentTarget.classList.contains('text-white')) {
                    deletefileIds(docId);
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.classList.remove('text-white');
                    e.currentTarget.classList.remove('shadow-sm');
                  } else {
                    if(e.detail === 1) addfileIds(docId);
                    e.currentTarget.style.background = 'black';
                    e.currentTarget.classList.add('text-white');
                    e.currentTarget.classList.add('shadow-sm');

                  }
                }}
                key={docId}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="mt-3"
                  style={{ fontSize: '3rem'}}
                  />
                <p className="text-center mt-3">{data.name}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      {uploadedUserFiles && uploadedUserFiles.length > 0 && (
        <>
        <p className="text-center border-bottom py-2">Uploaded Files</p>
        <Row
          md="2"
          style={{ height: 'auto' }}
          className="pt-2  gap-2 pb-4 px-5">
          {uploadedUserFiles.map(({ data, docId }) => (
            <Col
              onDoubleClick={() => history.push(`/dashboard/file/${docId}`)}
              onClick={(e) => {
                if (e.currentTarget.classList.contains('text-white')) {
                  deletefileIds(docId);
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.classList.remove('text-white');
                } else {
                  if(e.detail === 1) addfileIds(docId);
                  e.currentTarget.style.background = 'black';
                  e.currentTarget.classList.add('text-white');
                  
                }
              }}
              key={docId}
              md={2}
              className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2">
              <FontAwesomeIcon
                icon={
                  data.fileName
                  .split('.')
                  [data.fileName.split('.').length - 1].includes('png') ||
                  data.fileName
                  .split('.')
                  [data.fileName.split('.').length - 1].includes('jpg') ||
                  data.fileName
                    .split('.')
                    [data.fileName.split('.').length - 1].includes('jpeg') ||
                    data.fileName
                    .split('.')
                    [data.fileName.split('.').length - 1].includes('svg') ||
                    data.fileName
                    .split('.')
                    [data.fileName.split('.').length - 1].includes('gif')
                    ? faFileImage
                    : data.fileName
                    .split('.')
                    [data.fileName.split('.').length - 1].includes('mp4') ||
                    data.fileName
                        .split('.')
                        [data.fileName.split('.').length - 1].includes('mpeg')
                        ? faFileVideo
                        : data.fileName
                        .split('.')
                        [data.fileName.split('.').length - 1].includes('mp3')
                        ? faFileAudio
                        : faFileAlt
                      }
                      className="mt-3"
                      style={{ fontSize: '3rem', color: "#8f9094",}}
                      />
              <p className="text-center mt-3">{data.fileName}</p>
            </Col>
          ))}
        </Row>
      </>
      )}
      </Col>
    </Row>
    </>
  );
};

export default Home;