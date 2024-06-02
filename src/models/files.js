const fileModel = () => {
  const model = {
    createdAt: new Date(),
    createdBy: uid,
    data: data,
    name: name,
    parent: parent,
    updatedAt: new Date(),
    url: url,
    path: path,
  };

  return model;
};

export default fileModel;
